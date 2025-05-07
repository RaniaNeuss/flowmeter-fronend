export type Devices = {
  id: string;
  enabled: boolean;
  name: string;
  type: string;
  description?: string;
  property: {
    address:string;
    method:string;
    format:string;
    ip: string;
    port: number;
    host:number;
    SQLAlchemyURL:string
    slot: number;
    rack: number;
    username: string;
    password: string;
    DSN: string;
    databaseType:string;
  };
  polling: number;
  lastConnected: string; 
};
export type SelectType = {
  id: number;
  title: string;
  value: string;
};

export type SelectPolling = {
  id: number;
  title: string;
  value: number;
};


