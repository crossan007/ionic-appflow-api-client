import { gql, GraphQLClient } from "graphql-request";
import { getLogger } from "loglevel";

export const log = getLogger("AppFlowAPI");
log.setLevel("TRACE");

export const appFlowEndpoint = "https://api.ionicjs.com/graphql";

export let GClient: GraphQLClient;

export let authHeader: string;

export function SetAuth(token: string) {
  authHeader = `Bearer ${token}`;
  GClient = new GraphQLClient(appFlowEndpoint, {
    headers: {
      authorization: authHeader,
    },
  });
}

export * from "./apps";
export * from "./auth";
export * from "./builds";
export * from "./git";
export * from "./types";
export * from "./util";