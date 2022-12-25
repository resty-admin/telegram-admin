import { Update } from "nestjs-telegraf";
import type { INext } from "src/app/shared/interfaces/telegram";

import { AuthService } from "../../services";

@Update()
export class AuthUpdate {
	constructor(private readonly _authService: AuthService) {}

	async middleware(context: any, next: INext): Promise<void> {
		context.state.user = await this._authService.getUser(context.from);

		await next();
	}
}
