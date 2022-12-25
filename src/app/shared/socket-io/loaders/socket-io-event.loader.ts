import type { OnApplicationBootstrap, OnApplicationShutdown, Type } from "@nestjs/common";
import { Inject, Injectable } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";

import { SOCKET_EVENT_METADATA, SOCKET_IO_CLIENT, SOCKET_OPTIONS } from "../constants";
import type { EventMetadata } from "../interfaces";
import { ISocket } from "../interfaces";

@Injectable()
export class SocketIoEventLoader implements OnApplicationBootstrap, OnApplicationShutdown {
	constructor(
		private readonly discoveryService: DiscoveryService,
		private readonly metadataScanner: MetadataScanner,
		private readonly reflector: Reflector,
		@Inject(SOCKET_IO_CLIENT) private readonly socket: ISocket,
		@Inject(SOCKET_OPTIONS)
		private readonly socketOptions: { autoConnect?: boolean }
	) {}

	onApplicationBootstrap() {
		this.loadEventListeners();
		// Connect yourself if you set this options to false.
		if (!this.socketOptions.autoConnect) { return; }
		this.socket.connect();
	}

	onApplicationShutdown() {
		this.socket.disconnect();
	}

	loadEventListeners() {
		const providers = this.discoveryService.getProviders();
		const controllers = this.discoveryService.getControllers();
		for (const wrapper of [...providers, ...controllers]
			.filter((wrapper) => wrapper.isDependencyTreeStatic())
			.filter((wrapper) => wrapper.instance)) {
			const { instance } = wrapper;

			const prototype = Object.getPrototypeOf(instance);
			this.metadataScanner.scanFromPrototype(instance, prototype, (methodKey: string) =>
				this.subscribeToEventIfListener(instance, methodKey)
			);
		}
	}

	private subscribeToEventIfListener(instance: Record<string, any>, methodKey: string) {
		const socketEventMetadata = this.getEventHandlerMetadata(instance[methodKey]);

		if (!socketEventMetadata) {
			return;
		}

		const { event } = socketEventMetadata;

		this.socket.on(event, (...arguments_: unknown[]) => instance[methodKey].call(instance, ...arguments_));
	}

	private getEventHandlerMetadata(target: Type<unknown>): EventMetadata {
		return this.reflector.get<EventMetadata>(SOCKET_EVENT_METADATA, target);
	}
}
