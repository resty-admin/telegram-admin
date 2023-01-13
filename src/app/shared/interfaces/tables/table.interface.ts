import type { IFile } from "../files";
import type { IHall } from "../halls";
import type { IOrder } from "../orders";

export interface ITable {
	id: string;
	name: string;

	code: number;

	hall: IHall;

	orders?: IOrder[];

	file?: IFile;

	isHide: boolean;
}
