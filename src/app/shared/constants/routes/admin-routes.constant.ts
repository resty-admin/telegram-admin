import { COMPANY_ID, DYNAMIC_ID, DYNAMIC_TOKEN, PLACE_ID } from "../shared";

export const ADMIN_ROUTES = {
	AUTH: {
		path: "auth",
		absolutePath: "/auth"
	},
	SIGN_IN: {
		path: "sign-in",
		absolutePath: "/auth/sign-in"
	},
	ROLE: {
		path: "role",
		absolutePath: "/auth/role"
	},
	SIGN_UP: {
		path: "sign-up",
		absolutePath: "/auth/sign-up"
	},
	FORGOT_PASSWORD: {
		path: "forgot-password",
		absolutePath: "/auth/forgot-password"
	},
	RESET_PASSWORD: {
		path: `reset-password/${DYNAMIC_TOKEN}`,
		absolutePath: `/auth/reset-password/${DYNAMIC_TOKEN}`
	},
	VERIFICATION_CODE: {
		path: `verification-code/${DYNAMIC_TOKEN}`,
		absolutePath: `/auth/verification-code/${DYNAMIC_TOKEN}`
	},
	TELEGRAM: {
		path: "telegram",
		absolutePath: "/auth/telegram"
	},
	GOOGLE: {
		path: "google",
		absolutePath: "/auth/google"
	},
	ADMIN: {
		path: "",
		absolutePath: "/"
	},
	PROFILE: {
		path: "profile",
		absolutePath: "/profile"
	},
	COMPANIES: {
		path: "companies",
		absolutePath: "/companies"
	},
	COMPANY: {
		path: `companies/${COMPANY_ID}`,
		absolutePath: `/companies/${COMPANY_ID}`
	},
	PLACES: {
		path: `places`,
		absolutePath: `/companies/${COMPANY_ID}/places`
	},
	PLACE: {
		path: `places/${PLACE_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}`
	},
	DASHBOARD: {
		path: `dashboard`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/dashboard`
	},
	USERS: {
		path: `users`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/users`
	},
	USER: {
		path: `users/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/users/${DYNAMIC_ID}`
	},
	HALLS: {
		path: `halls`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/halls`
	},
	HALL: {
		path: `halls/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/halls/${DYNAMIC_ID}`
	},
	TABLES: {
		path: `halls/${DYNAMIC_ID}/tables`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/halls/${DYNAMIC_ID}/tables`
	},
	SHIFT: {
		path: `shift`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/shift`
	},
	ORDERS: {
		path: `orders`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/orders`
	},
	ACTIVE_ORDERS: {
		path: `active-orders`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/active-orders`
	},
	ALL_ORDERS: {
		path: `all-orders`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/all-orders`
	},
	ORDER: {
		path: `orders/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/orders/${DYNAMIC_ID}`
	},
	MENU: {
		path: `menu`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu`
	},
	CATEGORIES: {
		path: `categories`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/categories`
	},
	CATEGORY: {
		path: `categories/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/categories/${DYNAMIC_ID}`
	},
	PRODUCTS: {
		path: `products`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/products`
	},
	PRODUCT: {
		path: `products/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/products/${DYNAMIC_ID}`
	},
	COMMANDS: {
		path: `commands`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/commands`
	},
	COMMAND: {
		path: `commands/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/commands/${DYNAMIC_ID}`
	},
	WALLET: {
		path: `wallet`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/wallet`
	},
	CONTRACT: {
		path: `contract`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/contract`
	},
	PAYMENT_SYSTEMS: {
		path: `payment-systems`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/payment-systems`
	},
	PAYMENT_SYSTEM: {
		path: `payment-systems/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/payment-systems/${DYNAMIC_ID}`
	},
	ACCOUNTING_SYSTEMS: {
		path: `accounting-systems`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/accounting-systems`
	},
	ACCOUNTING_SYSTEM: {
		path: `accounting-systems/${DYNAMIC_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/accounting-systems/${DYNAMIC_ID}`
	}
};
