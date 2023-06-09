import { Client, Account } from "appwrite";
export const client = new Client();

// Configure the endpoint and project ID
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

export const account = new Account(client);
