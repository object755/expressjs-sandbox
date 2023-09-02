import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import fileUpload from 'express-fileupload'
import { CREDENTIALS } from './credentials.js'

const PORT = 5555;

// creates path to db parent
const DB_URL = `mongodb+srv://${CREDENTIALS.username}:${CREDENTIALS.password}@clustereu.wcfbshc.mongodb.net/drift_data`;
const API_PILOTS_URL = `http://localhost:${PORT}/api/pilots`;

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
        // testPost();
    } catch(e) {
        console.log(e);
    }
}

function testPost() {
    const url = API_PILOTS_URL;
    const data = {
        pilot: "Test Pilot",
        vehicle: "test vehicle",
        country: "test country",
        avatar: "test avatar",
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
