import Router from 'express'
import PostController from './PostController.js'
import postAllProfilesToDataBase from './postAllProfilesToDataBase.js'
import { CRUD_PATH, POST_ALL_PROFILES_PATH } from './serverData.js';


const router = new Router()

router.post(`/${CRUD_PATH}`, PostController.create)
router.get(`/${CRUD_PATH}`, PostController.getAll)
router.get(`/${CRUD_PATH}/:id`, PostController.getOne)
router.put(`/${CRUD_PATH}`, PostController.update)
router.delete(`/${CRUD_PATH}/:id`, PostController.delete)
// router.route(`/${POST_ALL_PROFILES_PATH}`)
//   .get(postAllProfilesToDataBase) // Execute the function for GET requests
// //   .post(postAllProfilesToDataBase);

// router.get(`/${POST_ALL_PROFILES_PATH}`, (req, res) => {
    
//     postAllProfilesToDataBase(req, res);
    
//     // You can send a response to the client
//     res.send('Function executed successfully!');
//   });

export default router;