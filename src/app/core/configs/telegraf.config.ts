import type { TelegrafModuleAsyncOptions } from "nestjs-telegraf";

import { environment } from "../../../environments/environment";

export const TELEGRAF_CONFIG: TelegrafModuleAsyncOptions = {
	// imports: [AuthModule],
	useFactory: () => ({
		token: environment.botToken,
		// middlewares: [authUpdate.middleware.bind(authUpdate)],
		...(environment.production
			? {
					launchOptions: {
						webhook: {
							domain: environment.botDomain,
							hookPath: environment.hookPath
						}
					}
			  }
			: {
					options: {
						telegram: {
							testEnv: true
						}
					}
			  })
	}),

	inject: []
};
