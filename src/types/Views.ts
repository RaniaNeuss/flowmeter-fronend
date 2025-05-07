/* eslint-disable @typescript-eslint/no-explicit-any */
export type View = {
  id: string;
  name: string;
  description: string | null;
  projectId: string;
  width: number;
  height: number;
  size: string;
  backgroundColor: string;
  margin: number;
  align: string;
  gridType: string;
  type: string;
  variables: any | null; 
  createdAt: string;
  updatedAt: string;
};
export type SelectGridType = {
  id: number;
  title: string;
  value: number;
};