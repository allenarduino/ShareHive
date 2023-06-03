import {Account, Client, Databases} from 'appwrite';
import {APPWRITE_PROJECT_ID, APPWRITE_PROJECT_ENDPOINT} from '@env';

// Connecting to appwrite server
const client = new Client();
client.setEndpoint(APPWRITE_PROJECT_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
