import { Action, Hears, InjectBot, Update } from "nestjs-telegraf";
import { IStateContext } from "src/app/shared";
import { ANY_SYMBOL } from "src/app/shared/constants";
import { OrdersEvents } from "src/app/shared/enums";
import { IOrderEvent, IOrderEventTableAdded, IOrderEventUserAdded } from "src/app/shared/interfaces/orders";
import { OnSocketEvent } from "src/app/shared/socket-io";
import { Telegraf } from "telegraf";

import { CONFIRM_ORDER, CONFIRM_PAYMNET } from "../../constants";
import { OrdersService } from "../../services";

@Update()
export class OrdersUpdate {
	constructor(@InjectBot() private readonly _bot: Telegraf, private readonly _ordersService: OrdersService) {}

	@Action(CONFIRM_PAYMNET)
	private async _confirmPayment(context: IStateContext) {
		if (!("data" in context.callbackQuery)) {
			return;
		}

		const [, orderId] = CONFIRM_PAYMNET.exec(context.callbackQuery.data) || [];

		await this._ordersService.confirmPayment(orderId);

		await context.answerCbQuery();
	}

	@Action(CONFIRM_ORDER)
	private async _confirmOrder(context: IStateContext) {
		if (!("data" in context.callbackQuery)) {
			return;
		}

		const [, orderId] = CONFIRM_ORDER.exec(context.callbackQuery.data) || [];

		await this._ordersService.confirmOrder(orderId);

		await context.answerCbQuery();
	}

	@Hears("Test")
	async test(context: IStateContext) {
		context.reply("test", {
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Confirm Order", callback_data: CONFIRM_ORDER.source.replace(ANY_SYMBOL, "order") },
						{ text: "Confirm Payment", callback_data: CONFIRM_ORDER.source.replace(ANY_SYMBOL, "payment") }
					]
				]
			}
		});
	}

	@OnSocketEvent(OrdersEvents.CREATED)
	async orderCreatedNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		const { orderNumber, table, type } = orderEvent.order;

		const text = `
Нове замовлення <b>${orderNumber}</b> за столом: ${table.name || table.code} з типом <b>${type}</b>.
`;
		for (const waiter of orderEvent.employees) {
			try {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	@OnSocketEvent(OrdersEvents.CLOSED)
	async orderClosedNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		const { orderNumber, table, type } = orderEvent.order;

		const text = `
Замовлення <b>${orderNumber}</b> за столом: ${table.name || table.code} з типом <b>${type}</b> закрито. 
`;
		for (const waiter of orderEvent.employees) {
			try {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	@OnSocketEvent(OrdersEvents.CONFIRM)
	async orderConfirmNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		const { orderNumber, table, type } = orderEvent.order;

		const text = `
Замовлення <b>${orderNumber}</b> за столом: ${table.name || table.code} з типом <b>${type}</b>.
Нові страви очікують на підтвердження. 
`;
		for (const waiter of orderEvent.employees) {
			try {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	@OnSocketEvent(OrdersEvents.WAITING_FOR_MANUAL_PAY)
	async orderWaitingForManualPayNotifyWaiter(orderEvent: IOrderEvent) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		const { orderNumber, table, type } = orderEvent.order;

		const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} з типом <b>${type}</b>.
Користувач запросив ручну оплату. 
`;
		for (const waiter of orderEvent.employees) {
			try {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	@OnSocketEvent(OrdersEvents.USER_ADDED)
	async addUserToOrderNotifyWaiter(orderEvent: IOrderEventUserAdded) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		const { orderNumber, table, type } = orderEvent.order;

		const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} з типом <b>${type}</b>.
Доданий користувач ${orderEvent.user.name} 
`;
		for (const waiter of orderEvent.employees) {
			try {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	@OnSocketEvent(OrdersEvents.TABLE_ADDED)
	async addTableToOrderNotifyWaiter(orderEvent: IOrderEventTableAdded) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		const { orderNumber, table, type } = orderEvent.order;

		const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} з типом <b>${type}</b>.
Доданий стіл ${orderEvent.table}
`;
		for (const waiter of orderEvent.employees) {
			try {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	@OnSocketEvent(OrdersEvents.TABLE_REMOVED)
	async removeTableToOrderNotifyWaiter(orderEvent: IOrderEventTableAdded) {
		if (orderEvent.employees.length === 0) {
			return;
		}

		const { orderNumber, table, type } = orderEvent.order;

		const text = `
Заказ <b>${orderNumber}</b> за столом: ${table.name || table.code} з типом <b>${type}</b>.
Вилучений стіл ${orderEvent.table}
`;
		for (const waiter of orderEvent.employees) {
			try {
				await this._bot.telegram.sendMessage(waiter.telegramId, text, {
					parse_mode: "HTML"
				});
			} catch (error) {
				console.error(error);
			}
		}
	}
}
