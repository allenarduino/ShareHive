import { Client, Account, Databases, Storage, Query } from "appwrite";
export const client = new Client();

// Configure the endpoint and project ID
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_PROJECT_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const query = new Query();
