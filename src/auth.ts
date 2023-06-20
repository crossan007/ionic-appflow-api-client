import { gql } from "graphql-request";
import { GClient } from ".";

export async function GetCurrentUser() {
  const query = gql`
    query GetCurrentUser {
      viewer {
        ...UserDetailFields
      }
    }

    fragment UserDetailFields on User {
      id
      created
      email
      name
      picture
      superUser
      username
      verified
      qualifiesTrialNative
      dashMetadata {
        data
      }
      trialNative {
        ...TrialDetailFields
      }
      personalAccessTokens {
        edges {
          node {
            ...PersonalAccessTokenFields
          }
        }
      }
    }

    fragment TrialDetailFields on Trial {
      id
      trialType
      start
      end
      expired
    }

    fragment PersonalAccessTokenFields on PersonalAccessToken {
      id
      name
      userId
      expirationDate
      created
      lastUsed
    }
  `;
  const response = await GClient.request(query);
  return response;
}
