import {
  EdgeNode,
  PageInfo,
  DateString,
  UnknownType,
  AppInfo,
  Commit,
  ResponseObject,
} from ".";

export type BuildsResponse = {
  app: {
    builds: ResponseObject<DeployBuild>
  };
};

export type CloneBuildResponse = {
  cloneBuild: {
    build: DeployBuild
  }
}

type AutomationReference = { 
  name: string; 
  automationId: number
};

type Stack = {
  id: number;
  available: boolean;
  eolDate: null;
  friendlyName: string;
  latest: boolean;
  name: string;
  platform: string;
  precedence: number;
  softwareVersions: SoftwareVersion[];
  type: string;
};

export interface SoftwareVersion {
  name: string;
  version: string;
}

export type DeployBuild = {
  __typename: "DeployBuild";
  number: number;
  created: DateString;
  started: DateString;
  building: UnknownType;
  finished: DateString;
  canceled: UnknownType;
  jobId: number;
  platform: string;
  state: "FAILED";
  type: "DEPLOY";
  callerId: number;
  uuid: string;
  rerunOf: UnknownType;
  customerUploaded: boolean;
  customerHosted: boolean;
  traceOnS3: boolean;
  caller: {};
  environmentVariables: [];
  environmentSecrets: [];
  deployments: { edges: EdgeNode<any>[] };
  app: AppInfo;
  automation: AutomationReference;
  commit: Commit;
  environment: UnknownType;
  stack: Stack;
  id: string;
  androidEq: UnknownType;
  androidMin: UnknownType;
  androidMax: UnknownType;
  iosEq: UnknownType;
  iosMin: UnknownType;
  iosMax: UnknownType;
  previewHash: UnknownType;
  artifacts: { edges: EdgeNode<any>[] };
  trace: string;
};
