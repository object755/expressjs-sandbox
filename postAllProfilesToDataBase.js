import { PORT, POST_ALL_PROFILES_PATH } from "./serverData.js";
import postProfileData from "./postProfileData.js";
import { pilotsManager } from "./pilotsManager.js";

console.log(`----------------------------------------------------`);
console.log(`VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV`);

export default function postAllProfilesToDataBase() {
  Object.entries(pilotsManager).forEach((pilot) => {
    let [pilotName, pilotData] = pilot;

    let { country, city, socials } = pilotData;

    postProfileData(
      PORT,
      POST_ALL_PROFILES_PATH,
      pilotName,
      country,
      city,
      socials
    );

    console.log(`${country} ${pilotName} ${city} ${socials}`);
  });
  return pilotsManager;
}
