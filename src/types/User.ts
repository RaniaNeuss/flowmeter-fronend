import { Group } from "./Group";

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  status:string;
  info: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
  groups: Group[];
}

export type SelectUserForm = {
  id: number;
  title: string;
  value: string;
};