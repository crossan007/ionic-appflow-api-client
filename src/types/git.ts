import { SHAString, DateString } from ".";

export interface Repository {
  id: string;
  htmlUrl: string;
  type: string;
}

export interface GitUser {
  __typename: "GitUser";
  name: string;
  username: string;
  profile: string;
  picture: string;
  id: string;
}

export type Commit = {
  id: number;
  beforeSha: SHAString;
  created: DateString;
  commitRepoLink: string;
  note: string;
  ref: string;
  refType: string;
  sha: SHAString;
  shortSha: SHAString;
  uuid: string;
  repository: Repository;
  user: GitUser;
};
