const router = require('koa-router')()
const controller = require("../controller/userController")

router.get('/', (ctx, next)=>{
  ctx.body = 'this is a get response!';
})
router.prefix('/user')

router.post('/register', controller.registerUser)
router.post('/findUser', controller.findUser)
router.post('/addName', controller.addName)
router.post('/sendMsg', controller.sendMsg)

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

module.exports = router
