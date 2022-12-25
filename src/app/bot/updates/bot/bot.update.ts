import { Start, Update } from "nestjs-telegraf";
import { STICKERS } from "src/app/shared/constants";

import { environment } from "../../../../environments/environment";
import { IStateContext } from "../../../shared";

const text = `Привет 👋🏼 
Я - твой онлайн официант, Resty!  

Я помогу тебе следить за бронями и новыми заказами 🙌🏼
`;

@Update()
export class BotUpdate {
	@Start()
	async start(context: IStateContext) {
		if (environment.production) {
			await context.replyWithSticker(STICKERS.hello);
		}

		await context.reply(text, {
			reply_markup: {
				inline_keyboard: [[{ text: "Начать", web_app: { url: environment.appUrl } }]]
			}
		});
	}
}
