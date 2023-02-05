import { Module } from "@nestjs/common";

import { ApolloService } from "./apollo.service";

@Module({
	providers: [ApolloService],
	exports: [ApolloService]
})
export class ApolloModule {}
