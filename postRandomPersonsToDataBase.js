import { PORT, POST_RANDOM_PROFILES_PATH } from "./serverData.js";
import postProfileData from "./postProfileData.js";

export default async function postRandomPersonsToDataBase(quantity = 15) {
  let generatedProfiles = [];
  for (let i = 0; i < quantity; i++) {
    let profileData = await getRandomProfile();
    generatedProfiles.push(profileData);
  }

  generatedProfiles.forEach((profile) => {
    let fullName = `${profile.name.first} ${profile.name.last}`;
    let country = `${profile.location.country}`;
    let city = `${profile.location.city}`;
    let social = `${profile.email}`;

    postProfileData(
      PORT,
      POST_RANDOM_PROFILES_PATH,
      fullName,
      profile
    );
    console.log(`${country} ${fullName} ${city} ${social}`);
  });
  return generatedProfiles;
}

async function getRandomProfile() {
  let response = await fetch("https://randomuser.me/api");
  let userData = await response.json();

  return userData.results[0];
}
