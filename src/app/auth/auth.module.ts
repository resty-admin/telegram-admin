import { Module } from "@nestjs/common";

import { ApiModule } from "../shared/api";
import { JwtModule } from "../shared/jwt";
import { AUTH_SERVICES } from "./services";
import { AUTH_UPDATES } from "./updates";

@Module({
	imports: [ApiModule.forChild(), JwtModule.forChild()],
	providers: [...AUTH_UPDATES, ...AUTH_SERVICES],
	exports: AUTH_UPDATES
})
export class AuthModule {}
