import { PORT, POST_ALL_PROFILES_PATH, GET_API_URL } from "./serverData.js";
import { pilotsManager } from "./pilotsManager.js";

let postUrl = GET_API_URL(PORT, POST_ALL_PROFILES_PATH);

export default async function postRandomPersonsToDataBase(quantity = 5) {
    let generatedProfiles = []
    for (let i = 0; i < quantity; i++) {
        let profileData = await getRandomProfile()
        generatedProfiles.push(profileData);
    }

    generatedProfiles.forEach(profile => {
        let name = `${profile.name.first} ${profile.name.last}`;
        let country = `${profile.location.country}`;
        let city = `${profile.location.city}`;
        let social = `${profile.email}`
        
        postProfileData(name, country, city, social);
        console.log(`${country} ${name} ${city} ${social}`)
    })
}

function postProfileData(profileName, country, city, social, avatar = '') {
    const data = {
        pilotName: profileName,
        city: city,
        country: country,
        social: social,
        avatar: avatar,
    };

    fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error))
}

async function getRandomProfile() {
    let response = await fetch('https://randomuser.me/api');
    let userData = await response.json();

    return userData.results[0];
}

