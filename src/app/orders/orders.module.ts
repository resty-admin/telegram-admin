import { Module } from "@nestjs/common";

import { ApiModule } from "../shared/api";
import { ORDERS_SERVICES } from "./services";
import { ORDERS_UPDATES } from "./updates";

@Module({
	imports: [ApiModule.forChild()],
	providers: [...ORDERS_UPDATES, ...ORDERS_SERVICES]
})
export class OrdersModule {}
