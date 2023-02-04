import type { IProduct } from "../products";
import type { IUser } from "../users";
import type { IOrder } from "./order.interface";


export interface IOrderEvent {
	order: IOrder;
	employees: IUser[];
}

export interface IOrderEventUserAdded extends IOrderEvent {
	user: IUser;
}

export interface IOrderEventProductAdded extends IOrderEvent {
	product: IProduct;
}

export interface IOrderEventTableAdded extends IOrderEvent {
	table: IProduct;
}
