import { CREDENTIALS } from "./credentials.js";
import inquirer from "inquirer";

export const PORT = 5555;
export const CRUD_PATH = "crud";
export const POST_ALL_PROFILES_PATH = "postAllProfiles";
export const POST_RANDOM_PROFILES_PATH = "postRandomProfiles";
export let dbPilots = `pilot_users`;
export let dbRandomProfiles = "random_profiles";
export let dbPilotsCollection = "pilot_names";
export let dbRandomUsersCollection = "profiles";

// creates path to db parent
export const DEFAULT_DB_URL = `mongodb+srv://${CREDENTIALS.username}:${CREDENTIALS.password}@clustereu.wcfbshc.mongodb.net/${dbPilots}`;
export const DB_RANDOM_PROFILES_URL = `mongodb+srv://${CREDENTIALS.username}:${CREDENTIALS.password}@clustereu.wcfbshc.mongodb.net/${dbRandomProfiles}`;

export const GET_API_URL = (PORT, API_PATH) =>
  `http://localhost:${PORT}/api/${API_PATH}`;

export const GET_DB_URL_CONNECT = async (
  credentials = CREDENTIALS,
  dbName = "random_profiles"
) => {
  let [username, password] = [credentials?.username, credentials?.password];
  
  if (!credentials) {
    let answers = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Enter your username:",
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password:",
        mask: "*",
      },
    ]);
    [username, password] = [answers.username, answers.password];
  }
//   console.log(password, username)

  return `mongodb+srv://${username}:${password}@clustereu.wcfbshc.mongodb.net/${dbName}`;
};
