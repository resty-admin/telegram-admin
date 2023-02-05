import { InjectBot, Update } from "nestjs-telegraf";
import { OrdersEvents } from "src/app/shared/enums";
import { IOrderEvent, IOrderEventTableAdded, IOrderEventUserAdded } from "src/app/shared/interfaces/orders";
import { OnSocketEvent } from "src/app/shared/socket-io";
import { Telegraf } from "telegraf";

import { OrdersService } from "../../services";

@Update()
export class OrdersUpdate {
	constructor(@InjectBot() private readonly _bot: Telegraf, private readonly _ordersService: OrdersService) {}

	// @Action(CONFIRM_PAYMNET)
	// private async _confirmPayment(context: IStateContext) {
	// 	if (!("data" in context.callbackQuery)) {
	// 		return;
	// 	}
	//
	// 	const [, orderId] = CONFIRM_PAYMNET.exec(context.callbackQuery.data) || [];
	//
	// 	await this._ordersService.confirmPayment(orderId);
	//
	// 	await context.answerCbQuery();
	// }

	// @Action(CONFIRM_ORDER)
	// private async _confirmOrder(context: IStateContext) {
	// 	if (!("data" in context.callbackQuery)) {
	// 		return;
	// 	}
	//
	// 	const [, orderId] = CONFIRM_ORDER.exec(context.callbackQuery.data) || [];
	//
	// 	await this._ordersService.confirmOrder(orderId);
	//
	// 	await context.answerCbQuery();
	// }

	// 	@OnSocketEvent(OrdersEvents.REQUEST_TO_CONFIRM_ORDER)
	// 	async displayOrder(order: IOrder) {
	// 		try {
	// 			const { id, table, products, users } = order;
	//
	// 			const text = `
	// Новый заказ за столом: ${table.code}
	//
	// <b>Закзали:</b>
	//
	// ${products.reduce((_text, { product, quantity }) => `${_text}${quantity}x	${product.name}	${product.price}грн\n`, "")}
	//
	// <b>Гости:</b>
	//
	// ${users.reduce((_text, { user }) => `${_text}${user.name}\n`, "")}
	// `;
	//
	// 			for (const waiter of table.waiters.filter(({ user }) => user)) {
	// 				await this._bot.telegram.sendMessage(waiter.user.telegramId, text, {
	// 					parse_mode: "HTML",
	// 					reply_markup: {
	// 						inline_keyboard: [[{ text: "Взять в работу", callback_data: CONFIRM_ORDER.source.replace(ANY_SYMBOL, id) }]]
	// 					}
	// 				});
	// 			}
	//
	// 			return "done";
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}

	// 	@OnSocketEvent(OrdersEvents.REQUEST_TO_CONFIRM_PAYMENT)
	// 	async displayPayment(order: IOrder) {
	// 		try {
	// 			const { id, table, products, users } = order;
	//
	// 			const sum = products.reduce((pre, { product, quantity }) => pre + product.price * quantity, 0);
	//
	// 			const text = `
	// Оплата <b>Наличными</b> за столом: ${table.code} на сумму <b>${sum}грн</b>.
	//
	// <b>Блюда:</b>
	//
	// ${products.reduce((_text, { product, quantity }) => `${_text}${quantity}x	${product.name}	${product.price}грн\n`, "")}
	//
	// <b>Гости:</b>
	//
	// ${users.reduce((_text, { user }) => `${_text}${user.name}\n`, "")}
	// `;
	//
	// 			for (const waiter of table.waiters.filter(({ user }) => user)) {
	// 				await this._bot.telegram.sendMessage(waiter.user.telegramId, text, {
	// 					parse_mode: "HTML",
	// 					reply_markup: {
	// 						inline_keyboard: [
	// 							[{ text: "Подтвердить оплату", callback_data: CONFIRM_PAYMNET.source.replace(ANY_SYMBOL, id) }]
	// 						]
	// 					}
	// 				});
	// 			}
	//
	// 			return "done";
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}

	@OnSocketEvent(OrdersEvents.CREATED)
	async orderCreatedNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			console.log(orderEvent);
			return;
		}

		try {
			const { orderNumber, table, type } = orderEvent.order;

			const text = `
Новый заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} с типом <b>${type}</b>.
`;
			for (const waiter of orderEvent.employees) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	@OnSocketEvent(OrdersEvents.CLOSED)
	async orderClosedNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		try {
			const { orderNumber, table, type } = orderEvent.order;

			const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} с типом <b>${type}</b> закрыт. 
`;
			for (const waiter of orderEvent.employees) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	@OnSocketEvent(OrdersEvents.CONFIRM)
	async orderConfirmNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		try {
			const { orderNumber, table, type } = orderEvent.order;

			const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} с типом <b>${type}</b>.
Новые блюда ожидают подтверждения. 
`;
			for (const waiter of orderEvent.employees) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	@OnSocketEvent(OrdersEvents.WAITING_FOR_MANUAL_PAY)
	async orderWaitingForManualPayNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		try {
			const { orderNumber, table, type } = orderEvent.order;

			const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} с типом <b>${type}</b>.
Пользователь запросил ручную оплату. 
`;
			for (const waiter of orderEvent.employees) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	@OnSocketEvent(OrdersEvents.USER_ADDED)
	async addUserToOrderNotifyWaiter(orderEvent: IOrderEventUserAdded) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		try {
			const { orderNumber, table, type } = orderEvent.order;

			const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} с типом <b>${type}</b>.
Добавлен пользователь ${orderEvent.user.name} 
`;
			for (const waiter of orderEvent.employees) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	@OnSocketEvent(OrdersEvents.TABLE_ADDED)
	async addTableToOrderNotifyWaiter(orderEvent: IOrderEventTableAdded) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		try {
			const { orderNumber, table, type } = orderEvent.order;

			const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} с типом <b>${type}</b>.
Добавлен стол ${orderEvent.table}
`;
			for (const waiter of orderEvent.employees) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	@OnSocketEvent(OrdersEvents.TABLE_REMOVED)
	async removeTableToOrderNotifyWaiter(orderEvent: IOrderEventTableAdded) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		try {
			const { orderNumber, table, type } = orderEvent.order;

			const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} с типом <b>${type}</b>.
Удален стол ${orderEvent.table}
`;
			for (const waiter of orderEvent.employees) {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			}
		} catch (error) {
			console.error(error);
		}
	}
}
