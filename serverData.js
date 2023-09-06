import { CREDENTIALS } from "./credentials.js";

export const PORT = 5555;
export const CRUD_PATH = "crud";
export const POST_ALL_PROFILES_PATH = "postAllProfiles";
export const POST_RANDOM_PROFILES_PATH = "postRandomProfiles";
export let dbPilots = `1testing`;
export let dbRandomProfiles = "random_profiles";
export let dbCollectionName = "pilot_names";
export let dbCollectionRandomProfiles = "profiles";

// creates path to db parent
export const DB_URL = `mongodb+srv://${CREDENTIALS.username}:${CREDENTIALS.password}@clustereu.wcfbshc.mongodb.net/${dbPilots}`;
export const DB_RANDOM_PROFILES_URL = `mongodb+srv://${CREDENTIALS.username}:${CREDENTIALS.password}@clustereu.wcfbshc.mongodb.net/${dbRandomProfiles}`;
export const GET_API_URL = (PORT, API_PATH) => `http://localhost:${PORT}/api/${API_PATH}`;
