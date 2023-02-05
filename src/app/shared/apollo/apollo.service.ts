import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from "@apollo/client";
import { Injectable } from "@nestjs/common";
import { environment } from "src/environments/environment";

@Injectable()
export class ApolloService {
	client: any;

	initApollo(authorization: string) {
		console.log("?");

		const authMiddleware = new ApolloLink((operation, forward) => {
			// add the authorization to the headers
			operation.setContext(({ headers = {} }) => ({
				headers: { ...headers, authorization }
			}));

			return forward(operation);
		});

		this.client = new ApolloClient({
			cache: new InMemoryCache(),
			link: concat(authMiddleware, new HttpLink({ uri: environment.graphqlUrl, fetch }))
		});
	}
}
