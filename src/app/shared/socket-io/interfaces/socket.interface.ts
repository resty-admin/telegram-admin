export interface ISocket {
	on(event: string, ...parameters: any[]);
	connect(): ISocket;
	disconnect(): ISocket;
}
