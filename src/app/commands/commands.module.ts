import { Module } from "@nestjs/common";

import { ApiModule } from "../shared/api";
import { COMMANDS_SERVICES } from "./services";
import { COMMANDS_UPDATES } from "./updates";

@Module({
	imports: [ApiModule.forChild()],
	providers: [...COMMANDS_SERVICES, ...COMMANDS_UPDATES]
})
export class CommandsModule {}
