export type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type EdgeNode<T> = {
  cursor: string;
  node: T;
};

export type ResponseObject<T> = {
  pageInfo: PageInfo;
  edges: EdgeNode<T>[];
  totalCount: number;
};

export type DateString = string;
export type SHAString = string;
export type UnknownType = any;

export * from "./builds";
export * from "./app";
export * from "./git";
