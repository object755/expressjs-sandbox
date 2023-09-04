import { PORT, POST_ALL_PROFILES_PATH, GET_API_URL } from "./serverData.js";
import { pilotsManager } from "./pilotsManager.js";
import PostController from "./PostController.js";

let postUrl = GET_API_URL(PORT, POST_ALL_PROFILES_PATH);
console.log(`---------------------------------------------------- `)

export default async function postAllProfilesToDataBase() {
    Object.entries(pilotsManager).forEach(pilot => {
        let [pilotName, pilotData] = pilot;

        let {country, city, socials} = pilotData
        
        postProfileData(postUrl, pilotName, country, city, socials)
        
        console.log(`${country} ${pilotName} ${city} ${socials}`)
    })
}

async function postProfileData(postUrl, profileName, country, city, social, avatar = '') {
    const data = {
        pilotName: profileName,
        city: city,
        country: country,
        social: social,
        avatar: avatar,
    };

    try {
        await PostController.create(data);
        // Continue with other operations after successful creation.
    } catch (error) {
        console.error("Error:", error);
        // Handle the error gracefully (e.g., send an error response).
    }

    // fetch(postUrl, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error("Error:", error))
}