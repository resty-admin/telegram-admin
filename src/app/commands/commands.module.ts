import { Module } from "@nestjs/common";

import { ApiModule } from "../shared/api";
import { COMMANDS_SERVICES } from "./services";

@Module({
	imports: [ApiModule.forChild()],
	providers: COMMANDS_SERVICES
})
export class CommandsModule {}
