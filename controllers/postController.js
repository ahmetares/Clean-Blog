const Post = require('../models/Post')



exports.getAllPosts =  async (req,res) =>{   

    const page = req.query.page || 1 // (direkt ilk sayfaya girerse)
    const postsPerPage = 2
    const postNumber = await Post.find().countDocuments();

     const posts = await Post.find({})
     .sort('-dateCreated')
     .skip((page-1)*postsPerPage)    
     .limit(postsPerPage)

    res.render('index' , {
      posts:posts,
      pages: Math.ceil(postNumber / postsPerPage ),
      current: page

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

