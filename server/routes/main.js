const express = require('express');
const router = express.Router();

//Routes
router.get('', (req, res) => {
   const locals = {
        title: 'Home Page',
        description: 'This is the home page of the 42 Blog',
   } 

    res.render('index', { locals, showSidebar: true });
});

//This is true if login and registration form are false
let showSidebar = true;
//

module.exports = router;