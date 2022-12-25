import { Injectable } from "@nestjs/common";
import { ApiService } from "src/app/shared/api";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { ORDERS_ENDPOINTS } from "src/app/shared/endpoints";

@Injectable()
export class OrdersService {
	constructor(private readonly _apiService: ApiService) {}

	async confirmPayment(id: string) {
		await this._apiService.post(ORDERS_ENDPOINTS.CONFIRM_PAYMENT.replace(DYNAMIC_ID, id));
	}

	async confirmOrder(id: string) {
		await this._apiService.post(ORDERS_ENDPOINTS.CONFRIM_ORDER.replace(DYNAMIC_ID, id));
	}
}
