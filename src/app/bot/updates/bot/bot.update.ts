import { Start, Update } from "nestjs-telegraf";
import { STICKERS } from "src/app/shared/constants";

import { environment } from "../../../../environments/environment";
import { IStateContext } from "../../../shared";

const text = `Привіт 👋🏼
Я - твій онлайн офіціант, Resty!

Я допоможу тобі стежити за бронями та новими замовленнями 🙌🏼
`;

@Update()
export class BotUpdate {
	@Start()
	async start(context: IStateContext) {
		if (environment.production) {
			await context.replyWithSticker(STICKERS.hello);
		}

		console.log('STARTED!');

		await context.reply(text, {
			reply_markup: {
				inline_keyboard: [[{ text: "Почати", web_app: { url: `${environment.appUrl}?from=telegram` } }]]
			}
		});
	}
}
