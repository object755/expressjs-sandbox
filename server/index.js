import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import { PORT, dbRandomProfiles, GET_DB_URL_CONNECT } from "./data/serverData.js";
import { CREDENTIALS } from "./data/credentials.js";
import fileUpload from "express-fileupload";
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);

app.use(express.static("public"));

// Handle requests for the root URL ("/") and serve the index.html file
app.get("/", (req, res) => {
  const indexPath = path.resolve(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});

async function startApp() {
  try {
    let credentials = CREDENTIALS || null
    const DB_URL = await GET_DB_URL_CONNECT(credentials, dbRandomProfiles);

    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`[Server is working]:[Port:${PORT}]`));
  } catch (e) {
    console.log(e);
  }
}

startApp()
