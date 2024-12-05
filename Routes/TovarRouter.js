const Router = require('express')
const router = new Router()
const TovarController = require('../Controllers/TovarController')

router.get('/tovar', TovarController.getAllTovar)
router.post('/tovar', TovarController.createTovar)
router.put('/tovar/:id', TovarController.updateTovar)
router.delete('/tovar/:id', TovarController.deleteTovar)


module.exports = router