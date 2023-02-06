import { Injectable } from "@nestjs/common";
import type { IAccessToken } from "src/app/shared";
import { ApiService } from "src/app/shared/api";
import { ApolloService } from "src/app/shared/apollo/apollo.service";
import { AUTH_ENDPOINTS } from "src/app/shared/endpoints";
import type { ITelegramUser } from "src/app/shared/interfaces/telegram";
import { JwtService } from "src/app/shared/jwt";
import type { IUser } from "src/app/shared/users";

@Injectable()
export class AuthService {
	constructor(
		private readonly _apiService: ApiService,
		private readonly _jwtService: JwtService,
		private readonly _apolloService: ApolloService
	) {}

	async getUser(telegramUser: ITelegramUser) {
		try {
			const { accessToken } = await this._apiService.post<IAccessToken>(AUTH_ENDPOINTS.TELEGRAM, telegramUser);

			this._apiService.setJwt(accessToken);
			this._apolloService.initApollo(accessToken);

			return this._jwtService.decode<IUser>(accessToken);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
