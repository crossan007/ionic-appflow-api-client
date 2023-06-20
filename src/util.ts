import { App, DeployBuild, EdgeNode, GetBuildsList, log } from ".";

export function DeNode<T>(edges: EdgeNode<T>[]): T[] {
  return edges.map(edge=>edge.node)
}

export type AppBrokenGit = App & {
  allBuilds: DeployBuild[]
  failedBuilds: DeployBuild[]
}

/**
 * Evaluates the build logs of the suppplied app to see if the git connection is broken
 * @param app 
 * @returns 
 */
export async function findAppBrokenGitBuilds(app: App): Promise<AppBrokenGit> {
  /**
   * Get the most recent app build
   */
  const builds = DeNode(await (await GetBuildsList(app.id, 1)).app.builds.edges);
  /**
   * Filter the list of builds to only those that failed because 
   * the repository could not be cloned
   */
  const failedBuilds = builds
    .filter((b) => b.trace.includes("The requested repository either does not exist or you do not have access"))
  

  return {
    ...app,
    allBuilds: builds,
    failedBuilds: failedBuilds
  }
}