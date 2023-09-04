import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import { PORT, DB_URL, POST_ALL_PROFILES_PATH, GET_API_URL } from './serverData.js'
import fileUpload from 'express-fileupload'
import { pilotsManager } from './pilotsManager.js'

// const PORT = 5555;
// let dbName = `Dapplication`

// // creates path to db parent
// const DB_URL = `mongodb+srv://${CREDENTIALS.username}:${CREDENTIALS.password}@clustereu.wcfbshc.mongodb.net/${dbName}`;
// const API_PILOTS_URL = `http://localhost:${PORT}/api/pilots`;

const app = express();

app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

app.get('/', (req, res) =>{
    console.log(req.query)
    res.status(200).json(`Server works like a charm ✅`)
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`[Server is working]:[Port:${PORT}]`));

        let urlForAllProfilesPosting = GET_API_URL(PORT,POST_ALL_PROFILES_PATH)
        postAllKnownProfilesToDataBase(urlForAllProfilesPosting)
    } catch(e) {
        console.log(e);
    }
}

function postAllKnownProfilesToDataBase(url) {
    Object.entries(pilotsManager).forEach(pilot => {
        let [pilotName, pilotData] = pilot;

        let {country, city, socials} = pilotData
        
        postPilotData(url, pilotName, country, city, socials)
        
        console.log(`${country} ${city} ${socials}`)
    })
}

function postPilotData(url, pilotName, country, city, social, avatar = '') {
    const data = {
        pilotName: pilotName,
        country: city,
        country: country,
        social: social,
        avatar: avatar,
    };

    fetch(url, {
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

startApp()
