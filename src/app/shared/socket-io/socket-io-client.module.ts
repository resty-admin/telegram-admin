import type { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import type { ManagerOptions, SocketOptions } from "socket.io-client";

import { SOCKET_IO_CLIENT, SOCKET_OPTIONS } from "./constants";
import { SocketIoEventLoader } from "./loaders";

@Module({})
export class SocketIoClientModule {
	static forRoot(url: string, options: Partial<ManagerOptions & SocketOptions> = {}): DynamicModule {
		return {
			module: SocketIoClientModule,
			global: true,
			imports: [DiscoveryModule],
			providers: [
				{
					provide: SOCKET_OPTIONS,
					useValue: options
				},
				{
					provide: SOCKET_IO_CLIENT,
					useFactory: async () => {
						const { io } = await import("socket.io-client");

						const socketIo = io(url, { autoConnect: true, ...options });

						socketIo.on("connected", () => {
							console.log("connected");
						});

						return socketIo;
					}
				},
				SocketIoEventLoader
			],
			exports: [SOCKET_IO_CLIENT]
		};
	}
}
