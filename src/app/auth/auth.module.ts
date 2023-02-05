import { Module } from "@nestjs/common";

import { ApiModule } from "../shared/api";
import { ApolloModule } from "../shared/apollo/apollo.module";
import { JwtModule } from "../shared/jwt";
import { AUTH_SERVICES } from "./services";
import { AUTH_UPDATES } from "./updates";

@Module({
	imports: [ApiModule.forChild(), JwtModule.forChild(), ApolloModule],
	providers: [...AUTH_UPDATES, ...AUTH_SERVICES],
	exports: AUTH_UPDATES
})
export class AuthModule {}
