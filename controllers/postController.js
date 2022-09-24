const Post = require('../models/Post')



exports.getAllPosts =  async (req,res) =>{   
    const posts = await Post.find({}).sort('-dateCreated')    //DB DEKİ POSTLARI İNDEX.EJS YE GNDORME
    res.render('index', {
      posts:posts
    })
  }


exports.createPosts =  async (req,res) =>{    //POSTLARI DB YE YAZMA 
    // console.log(req.body)  { title: 'TİTLE 1', postdetail: 'Post Detail 1' }
    await Post.create(req.body)
     res.redirect('/')
 }


exports.updatePosts =  async (req,res) => {
    const post = await Post.findById(req.params.id)
  
    post.title= req.body.title
    post.detail=req.body.detail
    await post.save()
  
    res.redirect(`/posts/${req.params.id}`)
    
  }


exports.deletePosts = async (req,res) =>{
    await Post.findByIdAndRemove(req.params.id)
    res.redirect('/')
  }

