import type { IUser } from "../../shared";

export interface ICommandEmit {
	command: ICommand;
	table: any;
	waiters: IUser[];
}


export interface ICommand {
	name: string;
	place: any;
	description: string;
}
