import { gql } from "graphql-request";
import log from "loglevel";
import { GClient } from ".";
import { App, AppsResponse } from "./types";

export async function GetAppById(appId: string): Promise<App> {
  try {
    const query = gql`
      query GetAppById($id: String!) {
        app(id: $id) {
          id
          createdByWizard
          icon
          name
          slug
          webPreview
          nativeType
          association {
            repository {
              cloneUrl
              type
              fullName
              htmlUrl
              hasWebhook
            }
          }
          organization {
            id
            slug
            name
            buildCreditsAvailable
          }
          owner {
            username
          }
        }
      }
    `;

    const variables = {
      id: appId,
    };

    const response = await GClient.request(query, variables);
    return (response as any).app as App;
  } catch (err) {
    log.warn("Failed to get app", err);
    throw new Error("Failed to get app");
  }
}

export async function GetOrganizationApps(
  organizationSlug: string,
  first: number
): Promise<AppsResponse> {
  const query = gql`
    query OrganizationApps(
      $slug: String!
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
      organization(slug: $slug) {
        apps(first: $first, last: $last, after: $after, before: $before) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              ...AppListFields
            }
          }
          totalCount
        }
      }
    }

    fragment AppListFields on App {
      id
      name
      slug
      created
      updated
      icon
      lastActivity
      webPreview
      nativeType
    }
  `;
  const variables = {
    first: first,
    slug: organizationSlug,
  };
  const response = await GClient.request(query, variables);
  return response as AppsResponse
}
