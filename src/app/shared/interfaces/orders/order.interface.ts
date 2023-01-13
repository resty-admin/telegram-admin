import type { OrderStatusEnum, OrderTypeEnum } from "src/app/shared/enums";

import type { ITable } from "../tables";
import type { IProductToOrder } from "./product-to-order.interface";
import type { IUserToOrder } from "./user-to-order.interface";
import {IPlace} from "../places";
import {IUser} from "../users";

// export interface IOrder {
// 	id: string;
// 	name: string;
// 	type: OrderTypeEnum;
// 	status: OrderStatusEnum;
// 	users: IUserToOrder[];
// 	table: ITable;
// 	code: number;
// 	products: IProductToOrder[];
// 	address: string;
// 	date: number;
// 	sum: string;
// 	time: string;
// 	place: string;
// }

export interface IOrder {
	id: string;
	code: number;

	orderNumber: number;

	table?: ITable;

	users: IUser[];

	type: OrderTypeEnum;

	status: OrderStatusEnum;

	place: IPlace;

	totalPrice?: number;

	usersToOrders?: IUserToOrder[];
}