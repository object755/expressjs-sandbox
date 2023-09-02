import Router from 'express'
import PostController from './PostController.js'

const router = new Router()

router.post('/pilots', PostController.create)
router.get('/pilots', PostController.getAll)
router.get('/pilots/:id', PostController.getOne)
router.put('/pilots/', PostController.update)
router.delete('/pilots/:id', PostController.delete)

export default router;