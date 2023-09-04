import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import { PORT, DB_URL, POST_ALL_PROFILES_PATH, CRUD_PATH, GET_API_URL } from './serverData.js'
import fileUpload from 'express-fileupload'

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

        let urlForAllProfilesPosting = GET_API_URL(PORT,POST_ALL_PROFILES_PATH);

        console.log(urlForAllProfilesPosting);
    } catch(e) {
        console.log(e);
    }
}

startApp()
