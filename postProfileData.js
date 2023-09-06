import { GET_API_URL } from "./serverData.js";

export default function postProfileData(port, url, profileName, country, city, social, avatar = '') {
    let postUrl = GET_API_URL(port, url);
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