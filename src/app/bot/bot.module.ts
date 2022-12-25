import { Module } from "@nestjs/common";

import { BOT_UPDATES } from "./updates";

@Module({
	providers: BOT_UPDATES,
	exports: BOT_UPDATES
})
export class BotModule {}
