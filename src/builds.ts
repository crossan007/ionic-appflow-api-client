import { gql } from "graphql-request";
import { BuildsResponse, CloneBuildResponse, GClient} from ".";

/**
 * Gets list of builds.  
 * 
 * Uses the GraphQL query from Ionic's web app modified to include the `trace` field
 * 
 * 
 * @param appId 
 * @param first 
 * @returns 
 */
export async function GetBuildsList(appId: string, first: number): Promise<BuildsResponse> {
  const query = gql`
    query BuildsList($appId: String!, $first: Int, $last: Int, $after: String, $before: String, $state: JobState, $platform: Platform, $deployable: Boolean) {
      app(id: $appId) {
        builds(
          first: $first
          last: $last
          after: $after
          before: $before
          state: $state
          platform: $platform
          deployable: $deployable
        ) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              __typename
              ...BuildListFields
              ...DeployBuildListFields
              ...PackageBuildListFields
            }
          }
        }
      }
    }
        
        fragment BuildListFields on Build {
      __typename
      number
      created
      started
      building
      finished
      canceled
      jobId
      platform
      state
      type
      callerId
      uuid
      rerunOf
      customerUploaded
      customerHosted
      trace
      traceOnS3
      caller {
        ... on User {
          name
          id
        }
      }
      environmentVariables {
        name
        value
      }
      environmentSecrets {
        name
        value
      }
      deployments {
        edges {
          node {
            id
            completed
            created
            status
            triggeredBy
            build {
              ... on PackageBuild {
                distributionCredential {
                  id
                }
              }
              ... on DistributionBuild {
                distributionCredential {
                  id
                }
              }
            }
          }
        }
      }
      app {
        id
      }
      automation {
        name
        automationId
      }
      commit {
        ...CommitFields
      }
      environment {
        id
        name
      }
      stack {
        id
        available
        eolDate
        friendlyName
        latest
        name
        platform
        precedence
        softwareVersions {
          name
          version
        }
        type
      }
    }
        
        fragment CommitFields on Commit {
      id
      beforeSha
      created
      commitRepoLink
      note
      ref
      refType
      sha
      shortSha
      uuid
      repository {
        id
        htmlUrl
        type
      }
      user {
        ... on User {
          __typename
          name
          username
          profile
          picture
          id
        }
        ... on GitUser {
          __typename
          name
          username
          profile
          picture
          id
        }
      }
    }
        
    
        fragment DeployBuildListFields on DeployBuild {
      id
      number
      created
      started
      building
      finished
      canceled
      jobId
      platform
      state
      type
      androidEq
      androidMin
      androidMax
      iosEq
      iosMin
      iosMax
      previewHash
      rerunOf
      customerUploaded
      customerHosted
      traceOnS3
      artifacts {
        edges {
          node {
            artifactType
            downloadUrl
            name
            artifactUrl
          }
        }
      }
      environmentVariables {
        name
        value
      }
      environmentSecrets {
        name
        value
      }
      callerId
      uuid
      caller {
        ... on User {
          name
          id
        }
      }
      deployments {
        edges {
          node {
            id
            completed
            created
            status
            triggeredBy
            build {
              ... on PackageBuild {
                distributionCredential {
                  id
                }
              }
              ... on DistributionBuild {
                distributionCredential {
                  id
                }
              }
            }
          }
        }
      }
      app {
        id
        nativeType
        webPreview
      }
      automation {
        name
        automationId
      }
      commit {
        ...DeployCommitFields
      }
      environment {
        id
        name
      }
      stack {
        id
        available
        eolDate
        friendlyName
        latest
        name
        platform
        precedence
        softwareVersions {
          name
          version
        }
        type
      }
    }
        
        fragment DeployCommitFields on Commit {
      id
      beforeSha
      created
      commitRepoLink
      note
      ref
      refType
      sha
      shortSha
      uuid
      repository {
        id
        htmlUrl
        type
      }
      user {
        ... on User {
          __typename
          name
          username
          profile
          picture
          id
        }
        ... on GitUser {
          __typename
          name
          username
          profile
          picture
          id
        }
      }
    }
        
    
        fragment PackageBuildListFields on PackageBuild {
      id
      number
      buildType
      created
      started
      building
      finished
      canceled
      credits
      jobId
      platform
      state
      type
      buildType
      rerunOf
      customerUploaded
      customerHosted
      traceOnS3
      nativePreview {
        appetizeUrl
      }
      profile {
        tag
        name
      }
      artifacts {
        edges {
          node {
            artifactType
            downloadUrl
            name
            artifactUrl
          }
        }
      }
      environmentVariables {
        name
        value
      }
      environmentSecrets {
        name
        value
      }
      callerId
      uuid
      caller {
        ... on User {
          name
          id
        }
      }
      deployments {
        edges {
          node {
            id
            completed
            created
            status
            triggeredBy
            build {
              ... on PackageBuild {
                distributionCredential {
                  id
                }
              }
              ... on DistributionBuild {
                distributionCredential {
                  id
                }
              }
            }
          }
        }
      }
      app {
        id
      }
      commit {
        ...PackageCommitFields
      }
      automation {
        name
        automationId
      }
      distributionCredential {
        id
        created
        name
      }
      environment {
        id
        name
      }
      nativeConfig {
        ...NativeConfigFields
      }
      nativeConfigVariables {
        ionic {
          appId
          channelName
          updateMethod
          maxStore
          minBackgroundDuration
          disableDeploy
        }
        base {
          bundleId
          name
        }
      }
      stack {
        id
        available
        eolDate
        friendlyName
        latest
        name
        platform
        precedence
        softwareVersions {
          name
          version
        }
        type
      }
    }
        
        fragment PackageCommitFields on Commit {
      id
      beforeSha
      created
      commitRepoLink
      note
      ref
      refType
      sha
      shortSha
      uuid
      repository {
        id
        htmlUrl
        type
      }
      user {
        ... on User {
          __typename
          name
          username
          profile
          picture
          id
        }
        ... on GitUser {
          __typename
          name
          username
          profile
          picture
          id
        }
      }
    }
        
    
        fragment NativeConfigFields on NativeConfig {
      id
      config
      created
      name
      configObject {
        ionic {
          appId
          channelName
          updateMethod
          maxStore
          minBackgroundDuration
          disableDeploy
        }
        base {
          bundleId
          name
        }
      }
    }
  `
  const variables = {
    appId: appId,
    first: first
  }
  const response = await GClient.request(query,variables);
  return response as BuildsResponse
}

export async function CloneBuild(buildId: number): Promise<CloneBuildResponse> {
  const query = gql`
    mutation CloneBuild($input: CloneBuildInput!) {
      cloneBuild(input: $input) {
        build {
          ...BuildDetailFields
        }
      }
    }
        
        fragment BuildDetailFields on Build {
      ...BuildListFields
      trace
    }
        
        fragment BuildListFields on Build {
      __typename
      number
      created
      started
      building
      finished
      canceled
      jobId
      platform
      state
      type
      callerId
      uuid
      rerunOf
      customerUploaded
      customerHosted
      traceOnS3
      caller {
        ... on User {
          name
          id
        }
      }
      environmentVariables {
        name
        value
      }
      environmentSecrets {
        name
        value
      }
      deployments {
        edges {
          node {
            id
            completed
            created
            status
            triggeredBy
            build {
              ... on PackageBuild {
                distributionCredential {
                  id
                }
              }
              ... on DistributionBuild {
                distributionCredential {
                  id
                }
              }
            }
          }
        }
      }
      app {
        id
      }
      automation {
        name
        automationId
      }
      commit {
        ...CommitFields
      }
      environment {
        id
        name
      }
      stack {
        id
        available
        eolDate
        friendlyName
        latest
        name
        platform
        precedence
        softwareVersions {
          name
          version
        }
        type
      }
    }
        
        fragment CommitFields on Commit {
      id
      beforeSha
      created
      commitRepoLink
      note
      ref
      refType
      sha
      shortSha
      uuid
      repository {
        id
        htmlUrl
        type
      }
      user {
        ... on User {
          __typename
          name
          username
          profile
          picture
          id
        }
        ... on GitUser {
          __typename
          name
          username
          profile
          picture
          id
        }
      }
    }
  `
  const variables = {
    input: {
      buildId: buildId
    }
  }
  const response = await GClient.request(query,variables);
  return response as CloneBuildResponse
  
}
