import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";

import { environment } from "../../environments/environment";
import { AuthModule } from "../auth/auth.module";
import { BotModule } from "../bot/bot.module";
import { CommandsModule } from "../commands/commands.module";
import { OrdersModule } from "../orders/orders.module";
import { ApiModule } from "../shared/api";
import { JwtModule } from "../shared/jwt";
import { SocketIoClientModule } from "../shared/socket-io";
import { API_CONFIG, JWT_CONFIG, TELEGRAF_CONFIG } from "./configs";

@Module({
	imports: [
		TelegrafModule.forRootAsync(TELEGRAF_CONFIG),
		ApiModule.forRoot(API_CONFIG),
		JwtModule.forRoot(JWT_CONFIG),
		SocketIoClientModule.forRoot(environment.apiDomain),
		BotModule,
		AuthModule,
		OrdersModule,
		CommandsModule
	]
})
export class CoreModule {}
