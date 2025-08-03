const WebUser = require('../models/webuser');
const Post = require('../models/Post');
const express = require('express')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Articles = require('../models/Articles');
const Solution = require('../models/Solution')
const chat = require('../models/Chat')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.home = (req, res) => {
  res.json({ message: "hello from this side!!" });
};

exports.sign = [
  check('name')
    .notEmpty()
    .withMessage("First name should not be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Length is too short, minimum 2 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name should only contain letters and spaces"),
  check('password')
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 6 }) 
    .withMessage("Password should be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),

  check('email')
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()  
    .withMessage("Invalid email format")
    .normalizeEmail(),
    

  (req, res, next) => {
    const { name,email,password ,usertype} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
    }

   WebUser.findOne({ email }).then(existingUser => {
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  return bcrypt.hash(password, 6).then(hashedPassword => {
    const newUser = new WebUser({ name, email, password: hashedPassword ,usertype});
    return newUser.save().then(() => {
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
}).catch(err => {
  console.error("Signup Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

  }
];





exports.login = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  check('password')
    .notEmpty().withMessage('Password is required'),

  (req, res,next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    WebUser.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        return bcrypt.compare(password, user.password).then(match => {
          if (!match) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          req.session.islogin = true;
          usertype = user.usertype;
          req.session.user = user;
          console.log(req.session.islogin);
          res.json({ message: "Login successful", status: 'ok' , islogin:req.session.islogin, usertype: user.usertype,user: user });
        });
      })
      .catch(err => {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  }
];


exports.postq = [
check('title')
  .notEmpty()
  .withMessage("Title should not be empty")
  .trim()
  .isLength({ min: 2 })
  .withMessage("Title is too short, minimum 2 characters"),
check('content')
  .notEmpty() 
  .withMessage("Content should not be empty")
  .trim()
  .isLength({ min: 10 })
  .withMessage("Content is too short, minimum 10 characters"),


  (req,res,nect)=>{
    const error =validationResult(req);
    if(!error.isEmpty){
      return res.status(400).json({errors:error.array()});
    }
    const {title, content, userId} = req.body;
    const newpost = new Post({title,content,user:userId});
    newpost.save().then(()=>{
      res.status(200).json({message:"Question posted successfully!"});
    }).catch(err=>{
      res.status(500).json({error:"Failed to post question. Please try again."});
    })
  }

];


exports.profile = (req,res,next)=>{
  const {userid} = req.body;
  
  if (!userid) {
    return res.status(400).json({ error: "User data is required" });
  }
  WebUser.findOne({ _id: userid}).then((userData)=>{
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    if(userData.usertype === 'farmer'){
       Post.find({ user: userid }).then((posts) => {
      console.log("Posts:", posts);
      res.status(200).json({ user: userData, posts: posts });

    }).catch(err => {
      console.error("Post Fetch Error:", err);
      res.status(500).json({ error: "Failed to fetch posts" });
    });
    }
    else{
       Articles.find({ user: userid }).then((posts) => {
      console.log("Posts:", posts);
      res.status(200).json({ user: userData, posts: posts });

    }).catch(err => {
      console.error("Post Fetch Error:", err);
      res.status(500).json({ error: "Failed to fetch posts" });
    });
    }
  
    
  }).catch(err=>{
    console.error("Profile Error:", err);
    res.status(500).json({ error: "Internal server error" });
  })
}

exports.postart = [
   check('title')
  .notEmpty()
  .withMessage("Title should not be empty")
  .trim()
  .isLength({ min: 2 })
  .withMessage("Title is too short, minimum 2 characters"),
check('content')
  .notEmpty() 
  .withMessage("Content should not be empty")
  .trim()
  .isLength({ min: 10 })
  .withMessage("Content is too short, minimum 10 characters"),

  (req,res,next)=>{
    const error =validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({errors:error.array()});
    }
  const {title,content,userid} = req.body;
  const article = new Articles({title,content,user:userid});
  article.save().then(()=>{
    res.status(200).json({message:"article posted successfully!"});
  }).catch((err)=>{
    console.log('error occure when save articles: '+ err);
  })
}


];

exports.viewarticle = (req,res,next)=>{
  console.log('reached at viewart');
    Articles.find().populate('user', 'name').then((arts)=>{
      console.log(arts);
      res.status(200).json({arts:arts});
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({error:err});
    })
}

exports.displayq = (req,res,next)=>{
  console.log("yess");
  Post.find({status:'false'}).populate('user', 'name') .then((questions)=>{
    res.status(200).json({questions:questions});
  }).catch((err)=>{
    res.status(500).json({message:"error occured from answerq"});
  })
}

exports.answerq = (req,res,next)=>{
  console.log("reache 2")
  const  {solution,user,post} = req.body;
   console.log("reache 3")
  const obj = new Solution({solution,post,user});
   console.log("reache 4")
  obj.save().then(()=>{
     console.log("reache 5")
    res.status(200).json({message:"done"});
  }).catch((err)=>{
    res.status(500).json({message:"error"});
  })
}


exports.viewans = (req,res,next)=>{
  const {questionId} = req.body;
  console.log(questionId);
  Solution.find({ post: questionId }).then((ans)=>{
    console.log(ans);
    console.log("now it is", questionId);
    res.status(200).json({ans:ans});
  }).catch((err)=>{
    res.status(500).json({message:"error"});
  })
}

exports.editprofile = (req, res, next) => {
  const { userid, username } = req.body;
   const imagePath = req.file ? req.file.filename : null;
     const updateData = { name: username };
  WebUser.findByIdAndUpdate(userid, { name: username }, { new: true })
    .then((updated) => {
      console.log(username);
      res.status(200).json({ updated });
    })
    .catch((err) => {
      res.status(500).json({ message: "error" });
    });
};



exports.getAllexp = (req,res,next)=>{
  WebUser.find({usertype:"expert"}).then((expert)=>{
res.status(200).json({expert:expert})
  }).catch((err)=>{
res.status(500).json({ message: "error" });
  })
}

exports.Chat = (req,res,next)=>{
  const {expertId,userId,expertName,message} = req.body;
 console.log(expertName)
 const ob = new chat({message:message , expuser:expertId , user:userId});
 ob.save().then(()=>{
  console.log("done");
  res.status(200).json({message:"done"});
 }).catch((err)=>{
   res.status(500).json({message:"done"});
 })
}

exports.getquestions = (req,res,next)=>{
   const {expertId,userId,expertName,message} = req.body;
   chat.find({user:userId , expuser:expertId}).then((questions)=>{
    res.status(200).json({questions:questions})
   }).catch((err)=>{
    res.status(500).json({message:"error"})
   })
}