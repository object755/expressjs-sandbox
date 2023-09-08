import { GET_API_URL } from "../data/serverData.js";

export default function postProfileData(
  port,
  url,
  fullName,
  data,
  country,
  city,
  social,
  avatar = ""
) {
  let postUrl = GET_API_URL(port, url);
  // const data = {
  //     name: profileName,
  //     city: city,
  //     country: country,
  //     social: social,
  //     avatar: avatar
  // };

  data = { fullName: fullName, ...data, userId: data.id };
  delete data.id;
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
