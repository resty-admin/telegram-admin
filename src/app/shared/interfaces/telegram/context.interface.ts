import type { Context } from "telegraf";

export type IContext = Context;

export interface IStateContext<State extends Record<string | symbol, any> = {}> extends Context {
	state: State;
}

export interface ISessionContext<Session extends Record<string | symbol, any> = {}> extends Context {
	session: Session;
}
