import type { IApiConfig } from "src/app/shared/api";

import { environment } from "../../../environments/environment";

export const API_CONFIG: IApiConfig = {
	baseURL: environment.apiUrl
};
