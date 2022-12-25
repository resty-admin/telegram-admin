import type { TelegrafModuleAsyncOptions } from "nestjs-telegraf";

import { environment } from "../../../environments/environment";
import { AuthModule } from "../../auth/auth.module";
import { AuthUpdate } from "../../auth/updates";

export const TELEGRAF_CONFIG: TelegrafModuleAsyncOptions = {
	imports: [AuthModule],
	useFactory: (authUpdate: AuthUpdate) => ({
		token: environment.botToken,
		middlewares: [authUpdate.middleware.bind(authUpdate)],
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

	inject: [AuthUpdate]
};
