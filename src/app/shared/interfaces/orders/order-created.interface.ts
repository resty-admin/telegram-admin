import type { IUser } from "../users";
import type { IOrder } from "./order.interface";
import {IProduct} from "../products";


export interface IOrderEvent {
	order: IOrder;
	waiters: IUser[];
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
