import * as dayjs from "dayjs";
import { InjectBot, Update } from "nestjs-telegraf";
import { IOrderEventPtos } from "src/app/shared";
import { OrdersEvents } from "src/app/shared/enums";
import { IOrderEvent, IOrderEventTableAdded, IOrderEventUserAdded } from "src/app/shared/interfaces/orders";
import { OnSocketEvent } from "src/app/shared/socket-io";
import { environment } from "src/environments/environment";
import { Telegraf } from "telegraf";

import { OrdersService } from "../../services";

export enum OrderTypeEnum {
	"RESERVE" = "RESERVE",
	"PICKUP" = "PICKUP",
	"IN_PLACE" = "IN_PLACE",
	"DELIVERY" = "DELIVERY"
}

const typesText = {
	[OrderTypeEnum.RESERVE]: "Бронювання",
	[OrderTypeEnum.PICKUP]: "З собою",
	[OrderTypeEnum.IN_PLACE]: "У закладі",
	[OrderTypeEnum.DELIVERY]: "Доставка"
};

const manualPaymentText = {
	CASH: "готівкою",
	TERMINAL: "термінал"
};

export const DAYJS_DISPLAY_FORMAT = "DD MMMM, HH:mm";

@Update()
export class OrdersUpdate {
	constructor(@InjectBot() private readonly _bot: Telegraf, private readonly _ordersService: OrdersService) {}

	async replyWithOrder(orderEvent: any, customTemplate: string = "") {
		console.log({ customTemplate, orderEvent });

		const { id, code, table, type, place, startDate, pTos, employees, users } = orderEvent;

		if (employees.length === 0) {
			return;
		}

		const messages = [`<b>Заведение:</b> ${place.name}`, `<b>Заказ:</b> ${code} з типом <b>${typesText[type]}</b>`];

		if (table) {
			messages.push(`<b>Стіл:</b> ${table.name}`);
		}

		if (startDate) {
			messages.push(`<b>Дата:</b> ${dayjs(startDate).format(DAYJS_DISPLAY_FORMAT)}`);
		}

		if ((users || []).length > 0) {
			messages.push(`<b>Гості:</b> ${users.reduce((pre, curr) => pre + (pre ? ", " : "") + curr.name, "")}`);
		}

		if ((pTos || []).length > 0) {
			messages.push(`<b>Страви:</b> ${pTos.reduce((pre, curr) => pre + (pre ? ", " : "") + curr.product.name, "")}`);
		}

		if (customTemplate) {
			messages.push("---", customTemplate);
		}

		for (const employee of employees.filter((employee) => employee.telegramId)) {
			try {
				await this._bot.telegram.sendMessage(employee.telegramId, messages.join("\n"), {
					parse_mode: "HTML",
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "Перейти",
									web_app: {
										url: `${environment.appUrl}/companies/${place.company.id}/places/${place.id}/orders/active-orders/${id}`
									}
								}
							]
						]
					}
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	@OnSocketEvent(OrdersEvents.CREATED)
	async orderCreatedNotifyWaiter(orderEvent: IOrderEvent) {
		this.replyWithOrder(orderEvent, "Створений");
	}

	@OnSocketEvent(OrdersEvents.REQUEST_TO_CONFIRM)
	async orderRequestToConfirmNotifyWaiter(orderEvent: IOrderEvent) {
		this.replyWithOrder(orderEvent, `Потрібне підтвердження столу`);
	}

	@OnSocketEvent(OrdersEvents.CLOSED)
	async orderClosedNotifyWaiter(orderEvent: IOrderEvent) {
		this.replyWithOrder(orderEvent, `Закрито`);
	}

	@OnSocketEvent(OrdersEvents.CANCELED)
	async orderCanceledNotifyWaiter(orderEvent: IOrderEvent) {
		this.replyWithOrder(orderEvent, `Відмінено`);
	}

	@OnSocketEvent(OrdersEvents.CONFIRM)
	async orderConfirmNotifyWaiter(orderEvent: IOrderEventPtos) {
		this.replyWithOrder(orderEvent, `Нові страви очікують на підтвердження`);
	}

	@OnSocketEvent(OrdersEvents.WAITING_FOR_MANUAL_PAY)
	async orderWaitingForManualPayNotifyWaiter(orderEvent: IOrderEventPtos) {
		this.replyWithOrder(
			orderEvent,
			`Користувач запросив ручну оплату. Тип: ${manualPaymentText[orderEvent.manualType]}`
		);
	}

	@OnSocketEvent(OrdersEvents.PAYMENT_SUCCESS)
	async orderPaymentSuccessNotifyWaiter(orderEvent: IOrderEventPtos) {
		this.replyWithOrder(orderEvent, `Користувач оплатив замовлення.`);
	}

	@OnSocketEvent(OrdersEvents.USER_ADDED)
	async addUserToOrderNotifyWaiter(orderEvent: IOrderEventUserAdded) {
		this.replyWithOrder(orderEvent, `Доданий користувач ${orderEvent.user.name}`);
	}

	@OnSocketEvent(OrdersEvents.TABLE_ADDED)
	async addTableToOrderNotifyWaiter(orderEvent: IOrderEventTableAdded) {
		this.replyWithOrder(orderEvent, `Доданий стіл ${orderEvent.table.name}`);
	}

	@OnSocketEvent(OrdersEvents.TABLE_REMOVED)
	async removeTableToOrderNotifyWaiter(orderEvent: IOrderEventTableAdded) {
		this.replyWithOrder(orderEvent, `Вилучений стіл ${orderEvent.table.name}`);
	}
}
