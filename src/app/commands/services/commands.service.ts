import { Injectable } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { ApiService } from "src/app/shared/api";
import { Telegraf } from "telegraf";

@Injectable()
export class CommandsService {
	constructor(@InjectBot() private readonly _bot: Telegraf, private readonly _apiService: ApiService) {}

	async displayCommand(body: any) {
		const { command, table } = body;

		const text = `${command.name} для столу №${table.code}`;
		for (const waiter of table.waiters) {
			try {
				await this._bot.telegram.sendMessage(waiter.user.telegramId, text);
			} catch (error) {
				console.error(error);
			}
		}
	}
}
