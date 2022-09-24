const express = require('express')
const ejs = require('ejs');
const app = express();
const Post = require('./models/Post')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')

//----------------------------------------------------

//connect DB
const mongoAtlasUri = 'mongodb+srv://ahmetares:12345@cluster0.8qfcqbi.mongodb.net/cleanblog-test-db'
try {
  // Connect to the MongoDB cluster
   mongoose.connect(mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },() => 
   console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}

//template engine
app.set('view engine', 'ejs')

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method' , {
  methods: ['POST' , 'GET'] 
}))

//routes
//postcontrollers
app.get('/', postController.getAllPosts)
app.post('/posts', postController.createPosts)
app.put('/posts/edit/:id', postController.updatePosts)
app.delete('/posts/:id', postController.deletePosts)

//page controllers
app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAddPage)
app.get('/posts/:id', pageController.getPostPage)
app.get('/posts/edit/:id', pageController.getEditPage)



//server
const port = 4000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı...`);
});

