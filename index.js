import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import { PORT, DB_URL, DB_RANDOM_PROFILES_URL } from "./serverData.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);

app.use(express.static("public"));

// Handle requests for the root URL ("/") and serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

async function startApp() {
  try {
    await mongoose.connect(DB_RANDOM_PROFILES_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`[Server is working]:[Port:${PORT}]`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
