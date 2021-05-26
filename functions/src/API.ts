import * as functions from "firebase-functions";
import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://life-management-hasura.herokuapp.com/v1/graphql",
  {
    headers: {
      "X-hasura-admin-secret": functions.config().hasura.adminsecret,
    },
  }
);
