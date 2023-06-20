import axios from "axios";
import { gql } from "graphql-request";
import log from "loglevel";
import { authHeader, GClient } from ".";

export async function GetBitbucketRepos(userId: string, owner: string) {
  const resp = await axios({
    url: `https://api.ionicjs.com/users/${userId}/oauth/bitbucket-cloud/repositories?owner=${owner}&=&page_token=0`,
    headers: {
      Authorization: authHeader,
    },
    method: "GET",
  });
  return resp.data;
}

/**
 *
 * Updates an app's connection to BitBucket
 * TODO: There's a call to Sentry.io here that doesn't seem to matter;
 *
 * @param appId
 * @param owner
 * @param repositoryId
 * @param type
 * @returns
 */
export async function CreateRepoAssociation(
  appId: string,
  owner: string,
  repositoryId: string,
  type: "BITBUCKET_CLOUD"
) {
  try {
    const document = gql`
      mutation CreateRepoAssociation(
        $input: CreateRepositoryAssociationInput!
      ) {
        createRepositoryAssociation(input: $input) {
          association {
            repository {
              id
            }
          }
          webhook {
            url
            secret
          }
        }
      }
    `;

    const variables = {
      input: {
        appId: appId,
        owner: owner,
        repositoryId: repositoryId,
        type: type,
      },
    };

    const updateRepo = await GClient.request(document, variables);
    return updateRepo;
  } catch (err) {
    log.warn("Failed to create repo association", err);
  }
}

export async function DeleteRepoAssociation(appId: string) {
  const query = gql`
    mutation DeleteRepoAssociation($input: DeleteRepositoryAssociationInput!) {
      deleteRepositoryAssociation(input: $input) {
        association {
          repository {
            id
          }
        }
      }
    }
  `;

  const variables = {
    input: {
      appId: appId,
    },
  };

  const response = await GClient.request(query, variables);
  return response;
}
