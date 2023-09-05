import { CREDENTIALS } from './credentials.js'

export const PORT = 5555;
export const CRUD_PATH = 'crud'
export const POST_ALL_PROFILES_PATH = 'postAllProfiles'
export const POST_RANDOM_PROFILES_PATH = 'postRandomProfiles'
export let dbName = `1testing`
export let dbCollectionName = 'pilot_names';

// creates path to db parent
export const DB_URL = `mongodb+srv://${CREDENTIALS.username}:${CREDENTIALS.password}@clustereu.wcfbshc.mongodb.net/${dbName}`;
export const GET_API_URL = (PORT, API_PATH) => `http://localhost:${PORT}/api/${API_PATH}`;