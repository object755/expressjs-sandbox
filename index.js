import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import { PORT, DB_URL, POST_ALL_PROFILES_PATH, CRUD_PATH, GET_API_URL } from './serverData.js'
import fileUpload from 'express-fileupload'
import {fileURLToPath} from "url";
import path from "path"; 

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const STATIC = path.join(__dirname, '../static/');
// const HTML_FILE_PRIMARY = path.join(STATIC, 'index.html');

// const app = express.static(STATIC);

app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

// app.get('/', (req, res) =>{
//     console.log(req.query)
//     res.status(200).json(`Server works like a charm ✅`)
// })

app.use(express.static('public'));

// Handle requests for the root URL ("/") and serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`[Server is working]:[Port:${PORT}]`));
    } catch(e) {
        console.log(e);
    }
}

startApp()
