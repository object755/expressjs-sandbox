import Router from "express";
import PostController from "./PostController.js";
import postAllProfilesToDataBase from "./postAllProfilesToDataBase.js";
import postRandomPersonsToDataBase from "./postRandomPersonsToDataBase.js";
import {
  CRUD_PATH,
  POST_ALL_PROFILES_PATH,
  POST_RANDOM_PROFILES_PATH,
} from "./serverData.js";

const router = new Router();

router.post(`/${CRUD_PATH}`, PostController.create);
router.post(`/${POST_ALL_PROFILES_PATH}`, PostController.create); //creates data for particular path
router.post(`/${POST_RANDOM_PROFILES_PATH}`, PostController.create); //writes data for random profiles path
router.get(`/${CRUD_PATH}`, PostController.getAll);
router.get(`/${CRUD_PATH}/:id`, PostController.getOne);
router.put(`/${CRUD_PATH}`, PostController.update);
router.delete(`/${CRUD_PATH}/:id`, PostController.delete);

router.get("/search", PostController.searchByName);

router.get(`/${POST_ALL_PROFILES_PATH}`, async (req, res) => {
  try {
    const postedData = await postAllProfilesToDataBase();
    const JSONdata = JSON.stringify(postedData, null, 2);
    res.send(`${JSONdata}`);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.get(`/${POST_RANDOM_PROFILES_PATH}`, async (req, res) => {
  try {
    const postedData = await postRandomPersonsToDataBase();
    const JSONdata = JSON.stringify(postedData, null, 2);
    res.send(`${JSONdata}`);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});
export default router;
