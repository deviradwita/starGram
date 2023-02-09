const {Post, Profile, Tag, User} = require('../models')
const formatDate = require('../helpers/formattedDate')


class Controller {
  //------------------ Landing Page ------------------
  static renderLandingPage(req, res) {
    res.render('landingPage')
  }

  // ------------------ Login ------------------
  static renderLoginPage(req, res) {
    res.render('loginPage')
  }

  //  ------------------ Register ------------------
  static renderRegisterPage(req, res) {
    res.send("helo")
  }

  static handlerRegisterPage(req, res) {
    res.send("helo")
  }

  // ------------------ Show All Post ------------------
  static renderPost(req,res){
    Post.findAll({
      include: {
        model: User,
        include: Profile
      } 
    })
      .then(data =>{
        // res.send(data)
        res.render('postPage', {data})
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