import { EdgeNode, PageInfo, Repository, ResponseObject } from ".";


export type AppsResponse = {
  organization:{
    apps: ResponseObject<App>
  }
};


export interface App {
  id: string;
  createdByWizard: boolean;
  icon: string;
  name: string;
  slug: string;
  webPreview: boolean;
  nativeType: string;
  association: Association;
  organization: Organization;
  owner: Owner;
}

interface Association {
  repository: Repository;
}

export interface Owner {
  username: string;
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  buildCreditsAvailable: boolean;
}

export type AppInfo = {
  id: string;
  nativeType: "IONIC";
  webPreview: false;
};
