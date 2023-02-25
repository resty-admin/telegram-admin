import type { ICompany } from "../companies";

export interface IPlace {
	id: string;
	name: string;
	address: string;
	startTime: number;
	endTime: number;
	company: ICompany;
}
