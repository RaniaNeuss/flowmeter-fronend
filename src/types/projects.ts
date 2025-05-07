import { View } from "./Views";


export type Projects = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  alarms: any[]; 
  devices: any[]; 
  reports: any[]; 
  scripts: any[];
  texts: any[]; 
  events: any[]; 
  views: View[];
};

export type UpdateProjectPayload = {
  data: {
    name: string;
    description: string;
  };
};