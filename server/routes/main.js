const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Routes

// Get Home//
router.get('', async (req, res) => {
   const locals = {
        title: 'Home Page',
        description: 'This is the home page of the 42 Blog',
   } 
    
   try {
     const data = await Post.find();
     res.render('index', { locals, data, showSidebar: true });
   } catch (error) {
     console.log(error);
   }

});

//Get About//
router.get('/about', (req, res) => {
    const locals = {
        title: 'About Page',
        description: 'This is the about page of the 42 Blog',
    }

    res.render('about', { locals, showSidebar: true });
});

//This is true if login and registration form are false
let showSidebar = true;
//

/* function insertPostData () {
     Post.insertMany([
          {
               title: "Creando un Blog",
               body: "Este es el body"
          },
          {
               title: "Creando un Bloog",
               body: "Este es el booooody"
          },
          {
               title: "Creando un Blooggggg",
               body: "Este es el booooodyyyyy"
          },
     ])
}
insertPostData(); */

module.exports = router;