const {Post, Profile, Tag, User} = require('../models')
const formatDate = require('../helpers/formattedDate')
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs')
const session = require('express-session')


class Controller {
  //------------------ Landing Page ------------------
  static renderLandingPage(req, res) {
    res.render('landingPage')
  }

  // ------------------ Login ------------------
  static renderLoginPage(req, res) {
    const {error} = req.query;
    res.render('loginPage', {error})
  }

  static handlerLoginPage(req, res) {
    const {userName, password} = req.body;
    // console.log({userName, password})
    User.findOne({
      where: {userName}
    })
      .then(user =>{
        if (user){
          const isValidPassword = bcrypt.compareSync(password, user.password);

          if(isValidPassword){
            req.session.UserId = user.id
            req.session.role = user.role
            return res.redirect('/posts')
          } else {
            let error = 'Invalid Password'
            return res.redirect(`/login?error=${error}`);
          }
        } else {
          let error = 'Invalid Username';
          return res.redirect(`/login?error=${error}`);
        }
      })
      .catch(err => res.send(err));
  }

  // ------------------ Logout -----------------
  static userLogOut(req,res){
    req.session.destroy(err =>{
      if(err){
        res.send(err)
      } else {
        res.redirect('/')
      }
    })
  }

  //  ------------------ Register ------------------
  static renderRegisterUserPage(req, res) {
    res.render('registerUserPage')
  }

  static handlerRegisterUserPage(req, res) {
    const { userName, email, password} = req.body;
    
    // let errors = {};

    // if (!userName){
    //   errors.name = "userName"
    // }

    // if(!password){
    //   errors.name = "password"
    // }
    
    User.create({
      userName,
      email,
      password
    })
      .then(data =>{
        // res.send(data)
        res.redirect(`/registerProfile/${data.id}`);
      })
      .catch((err) => res.send(err))
    // // console.log(req.body)
    // let UserId;
    // Profile.create({name, gender, birthDate, UserId})
    // .then(data =>{
    //   // UserId = data[data.length-1].id + 1;
    //   // res.send(data[data.length-1].id)
    //   // console.log(data[data.length-1].id + 1)
    //   UserId = data.id
    //   // res.send(data)
    //   // return User.findAll()
    //   })
    //   .then(data => {
    //     let profile = Profile.create({
    //       name,
    //       gender,
    //       birthDate,
    //       UserId
    //     })
    //     res.send(profile)
    //   })

    //   // .then((data) =>{
    //   //   UserId = data[data.length-1].id + 1;
    //   //   return Profile.create({
    //   //     name,
    //   //     gender,
    //   //     birthDate,
    //   //     UserId
    //   //   })
    //   // })
    //   // .then(() =>{
    //   //   res.redirect('/posts')
    //   // })
    //   .catch(err => res.send(err))
  }

  static renderRegisterProfilePage(req,res){
    const {id} = req.params;
    res.render('registerProfilePage', {id})
  }

  static handlerRegisterProfilePage(req,res){
    const {id} = req.params
    const {name, gender, birthDate} = req.body;

    Profile.create({
      name,
      gender,
      birthDate,
      UserId: id
    })
      .then(() =>{
        res.redirect('/posts')
      })
      .catch(err =>{
        res.send(err)
      })
  }

  // ------------------ Show All Post ------------------
  static renderPost(req,res){
    const {sort} = req.query;

    let option = {
      include: {
        model: User,
        include: Profile
      } 
    };
    // console.log(sort);
    if(sort){
      option.where = {
        // TagId: sort
        TagId: { [Op.in]: [sort] }
        // [Op.eq] : sort
      }
    }

    let postData;
    Post.findAll(option)
    // User.findAll({
    //   include : {
    //     model: Post,
    //     include: Tag
    //   }
    // })
      .then(data =>{
        postData = data
        return Tag.findAll()
      })
      .then(dataTag =>{
        
        // res.send(postData)
        res.render('postPage', {data: postData, dataTag});
        // res.render('partials/navbar')
      })
      .catch(err => res.send(err))
  }
  
  // ------------------ Add Post ------------------
  static renderAddPost(req, res) {
    let data;
    const {id} = req.params
    Profile.findAll({
      where:{id}})
    .then(dataProfile=>{
      data=dataProfile
      return Tag.findAll()
    })
    
    .then(tagData=>{
      // res.send(tagData)
      res.render('addPost', {data, tagData})
    })
    .catch(err => res.send(err))
  }

  static handlerAddPost(req, res) {
    const {id} = req.params
    // console.log(req.body);
    const {title, content, imgUrl, TagId}= req.body
    Post.create({
      UserId: id,title, content, imgUrl, TagId
    })
    .then(() => res.redirect(`/profile/${id}`))
    .catch(err => res.send(err))
  }

  // ------------------ Get Profile ------------------
  static getProfileById(req, res) {
    // res.send("helooo")
    const {id} = req.params
    User.findByPk(id, {
      include:[
        Profile,
         {
          model:Post,
          include: Tag
        }
        ]
      })
      .then(data =>{
        // res.send(data)
        res.render('profilePage', {data} )
      })
      .catch(err=> res.send(data))
  }

  // ------------------ Edit Profile ------------------
  static renderEditProfile(req,res){
    const {id} = req.params
    Profile.findAll({
      include: User,
      where: {UserId:id}
    })
      .then(data =>{
        // res.send(data)
        res.render('editProfilePage', {data, formatDate})
      })
      .catch(err => res.send(err))
  }

  static handlerEditProfile(req,res){
    const {id} = req.params
    const {name, gender, birthDate, userName, email, password} = req.body
    // console.log(data)

    Profile.update({name, gender, birthDate}, {
      where:{id}
    })
      .then(() =>{
        return User.update({
          userName,
          email,
          password
        },{
          where:{id}
        })
      })
      .then(() => res.redirect(`/profile/${id}`))
      .catch(err => res.send(err))
  }  

  // ------------------ Edit Post ------------------
  static renderEditPost(req, res) {
    const {id} = req.params;
    // res.send("helo");
    let postData;
    Post.findAll({
      include:  Tag,
      where:{id}
    })
    .then(data =>{
      postData = data;
      return Tag.findAll()
    })
    .then(tagData =>{
      // res.send(tagData)
      res.render('editPostPage',{postData, tagData})
    })
    .catch(err => res.send(err))
    // res.render('editPost')
  }

  static handlerEditPost(req, res) {
    // console.log(req.body)
    const {id} = req.params;
    const {title, content, TagId} = req.body;

    Post.update({
      title,
      content,
      TagId
    },
    {where: {id}})
      .then(() =>{
        res.redirect(`/profile/${id}`)
      })
      .catch(err => {
        console.log(err, "<<<<<,,")
        res.send(err)
      })
  }

  // ------------------ Delete Post ------------------
  static deletePost(req, res) {
    // res.send("helo");
    const {id} = req.params;

    // console.log({id})
    let userId;
  
    Post.findAll({
      where : {id},
    })
      .then((data) =>{
        // res.send(data)
        userId = data[0].UserId
        return Post.destroy({
          where:{id}
        })
        .then(() =>{
          res.redirect(`/profile/${userId}`)
        })
      })
      .catch(err => res.send(err))
  }
}

module.exports = Controller;