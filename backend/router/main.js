const router = require('./host');
const express = require('express');
const upload = require('../uploadMiddleware');
const {home,sign,login,postq,profile,postart,viewarticle,displayq,answerq,viewans,editprofile,getAllexp,Chat,getquestions} = require('../controller/home');
const app = express();
router.get('/home',home);
router.post('/sign',sign);
router.post('/login',login);
router.post('/postq',postq);
router.post('/userprofile',profile);
router.post('/postart',postart);
router.get('/viewarticle',viewarticle)
router.get('/displayq',displayq)
router.post('/answerq',answerq)
router.post('/viewans',viewans)
router.post('/editprofile',editprofile)
router.get('/getAllexp',getAllexp)
router.post('/Chat',Chat)
router.post('/getquestions',getquestions)
module.exports = router;