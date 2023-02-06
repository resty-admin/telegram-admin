import { Injectable } from "@nestjs/common";
import { ApiService } from "src/app/shared/api";
import { ApolloService } from "src/app/shared/apollo/apollo.service";

// const ORDER_QUERY = gql`
// 	query Order($orderId: String) {
// 		order(id: $orderId) {
// 			id
// 			productsToOrders {
// 				id
// 				status
// 			}
// 		}
// 	}
// `;

@Injectable()
export class OrdersService {
	constructor(private readonly _apiService: ApiService, private readonly _apolloService: ApolloService) {}

	async confirmPayment(id: string) {
		console.log("confirmPayment", id);
	}

	async confirmOrder(id: string) {
		console.log("id", id);
		// const query = await this._apolloService.client.query({
		// 	query: ORDER_QUERY,
		// 	variables: { orderId: "b2eff88a-5875-443f-9555-c0a56168d5c6" }
		// });
		// console.log("data", query.data);
	}
}
