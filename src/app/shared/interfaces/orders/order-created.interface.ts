import type { OrderTypeEnum } from "../../enums";
import type { ITable } from "../tables";
import type { IUser } from "../users";

export interface IOrderCreated {
	orderNumber: string;
	table: ITable;
	type: OrderTypeEnum;
	waiters: IUser[];
}
