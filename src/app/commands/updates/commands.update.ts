import { InjectBot, Update } from "nestjs-telegraf";
import { OnSocketEvent } from "src/app/shared/socket-io";
import { Telegraf } from "telegraf";

import { COMMAND_EMITTED } from "../events";
import { ICommandEmit } from "../interfaces";

@Update()
export class CommandsUpdate {
	constructor(@InjectBot() private readonly _bot: Telegraf) {}

	@OnSocketEvent(COMMAND_EMITTED)
	async commandEmit(command: ICommandEmit) {
		if (command.waiters.length === 0) {
			return;
		}

		console.log('command', command);
		try {
			const text = `
${command.command.description} за стол: ${command.table.name || command.table.code}. 
`;
			for (const waiter of command.waiters) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}
}
