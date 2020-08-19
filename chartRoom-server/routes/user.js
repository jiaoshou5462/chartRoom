const router = require('koa-router')()
const controller = require("../controller/userController")

router.get('/', (ctx, next)=>{
  ctx.body = 'this is a get response!';
})
router.prefix('/user')

router.post('/register', controller.registerUser)
router.post('/findUser', controller.findUser)
router.post('/addName', controller.addName)

router.post('/uploadfile',controller.uploadFile);

router.get('/getFile',controller.getFile);

router.get('/getRecord',controller.getRecord);
router.get('/getRecordChat',controller.getRecordChat);

router.get('/searchUser',controller.searchUser);

router.get('/getMessage',controller.getMessage);

router.get('/getMessageNum',controller.getMessageNum);
router.get('/getContacts',controller.getContacts);

module.exports = router
