import type { IFile } from "../files";
import type { ILayer } from "../layers";
import type { ITable } from "../tables";
import {IPlace} from "../places";

export interface IHall {
	id: string;
	name: string;

	place: IPlace;

	file?: IFile;

	tables?: ITable[];

	isHide: boolean;
}
