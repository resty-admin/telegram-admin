import "dayjs/locale/uk";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as dayjs from "dayjs";
import { getBotToken } from "nestjs-telegraf";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

dayjs.locale("uk"); // use locale globally
// dayjs.extend(customParseFormat);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	if (environment.production) {
		const bot = app.get(getBotToken());
		app.use(bot.webhookCallback(environment.hookPath));
	}

	await app.listen(environment.port);
}

bootstrap().then(() => {
	Logger.log(`🚀 Application is running on: http://localhost:${environment.port}`);
	Logger.log(`🚀 Telegram Bot Admin is running`, "Bootstrap");
});
