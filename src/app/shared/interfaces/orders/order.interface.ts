import type { OrderStatusEnum, OrderTypeEnum } from "src/app/shared/enums";

import type { IPlace } from "../places";
import type { ITable } from "../tables";
import type { IUser } from "../users";
import type { IUserToOrder } from "./user-to-order.interface";

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

	waiters: IUser[];
}
