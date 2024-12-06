const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Routes

// Get Home//
router.get('', async (req, res) => {
   try {
     const locals = {
          title: 'Home Page',
          description: 'This is the home page of the 42 Blog',
     }
     
     let perPage = 10;
     let page = req.query.page || 1;

     const data = await Post.aggregate([{ $sort: { createdAt: -1 }}])
     .skip(perPage * page - perPage)
     .limit(perPage)
     .exec();
     
     const count = await Post.countDocuments();
     const nextPage = parseInt(page) + 1;
     const hasNextPage = nextPage <= Math.ceil(count / perPage);

     res.render('index', { 
          locals,
          data,
          currentRoute: '/',
          current: page,
          nextPage: hasNextPage ? nextPage : null,
          showSidebar: true,
          showCofre: false,
          showAdminDragon: false,
     });
   } catch (error) {
     console.log(error);
   }

});

//Post Search//

router.post('/search', async (req, res) => {
     try {
          const locals = {
               title: 'Search',
               description: 'This is the about page of the 42 Blog',
           }

           let searchTearm = req.body.searchTerm;
           const searchNoSpecialChar = searchTearm.replace(/[^a-zA-Z0-9]/g, '');

          const data = await Post.find({
               $or: [
                    { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                    { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
               ]
          });

          res.render("search", {
               data,
               locals,
               currentRoute: '/search',
               showSidebar: true,
               showCofre: true
          });

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

    res.render('about', { 
     locals,
     currentRoute: '/about',
     showSidebar: true,
     showCofre: false,
     showAdminDragon: false,});
});

// Referencias //
router.get('/referencias', (req, res) => {
     const locals = {
          title: 'Referencias Page',
          description: 'This is the referencias page of the 42 Blog',
      }
  
      res.render('referencias', { 
       locals,
       currentRoute: '/referencias',
       showSidebar: true,
       showCofre: false,
       showAdminDragon: false,});
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

//Get Post//
router.get('/post/:id', async (req, res) => {
     try {
          
          let slug = req.params.id;

          const data = await Post.findById({ _id: slug });

          const locals = {
               title: data.title,
               description: 'This is the post page of the 42 Blog',
          }

          res.render('post', { 
               locals,
               data,
               currentRoute: `/post/${slug}`,
               showSidebar: true,
               showCofre: false});
     } catch (error) {
          console.log(error);
     }
});

module.exports = router;