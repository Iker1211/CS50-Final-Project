const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

//Basic Router//
/* router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: 'Admin Page',
            description: 'This is the admin page of the 42 Blog',
        }

        res.render('admin/index', {
            locals,
            showSidebar: true,
            showCofre: false,
        });
    } catch (error) {
        console.log(error);
    }
}); */

// Check Login //
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json( { message: 'Unauthorized' });
    } else {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            return res.status(401).json( { message: 'Unauthorized' });
    }
}
};

//Admin Router//
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: 'Admin Page',
            description: 'This is the admin page of the 42 Blog',
        }

        res.render('admin/index', {
            locals,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: false,
        });
    } catch (error) {
        console.log(error);
    }
});

//Admin Post Check Login//
 router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne( { username } );

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
}); 

// Get Admin Dashboard //
router.get('/dashboard', authMiddleware, async (req, res) => {

    try {
        const locals = {
            title:'Admin Dashboard',
            description: 'This is the admin dashboard of the 42 Blog',
        }

        const data = await Post.find();
        res.render('admin/dashboard', {
            locals,
            data,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: true,
    });

    } catch (error) {
    console.log(error);
    }


});

//Get - Admin - Create New Post//
router.get('/add-post', authMiddleware, async (req, res) => {
try {
    const locals = {
        title: 'Add Post',
        description: 'This is the add post page of the 42 Blog',
    }

    const data = await Post.find();
    res.render('admin/add-post', {
        locals,
        data,
        layout: adminLayout,
        showSidebar: false,
        showCofre: false,
        showAdminDragon: true,
    })

} catch (error) {
    
}
}); 


// Post - Admin - Create New Post //
router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });

            await Post.create(newPost);
            res.redirect('/dashboard');
        } catch (error) {  
            console.log(error); 
        }
        
    } catch (error) {
        console.log(error);
    }
    }); 

// Get - Admin - Edit Post //
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {

        const locals = {
            title: 'Edit Post',
            description: 'This is the edit post page of the 42 Blog',
        };

        const data = await Post.findOne({_id: req.params.id});

        res.render('admin/edit-post', { 
            data,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: true
    });
        
    } catch (error) {
        console.log(error);
    }

    }); 

// Put - Admin - Edit Post //
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/edit-post/${req.params.id}`);
        
    } catch (error) {
        console.log(error);
    }

    }); 

router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            description: 'This is the add post page of the 42 Blog',
        }
    
        const data = await Post.find();
        res.render('admin/add-post', {
            locals,
            data,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: true,
        })
    
    } catch (error) {
        
    }
    }); 

    //Ruta de Registro
 router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password:hashedPassword });
            res.status(201).json({ message: 'User Created', user });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'Username already exists' });
            } 
            res.status(500).json({ message: 'Internal Server Error'});
        }

    } catch (error) {
        console.log(error);
    }
}); 

// Delete - Admin - Delete Post //
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

    try {
        await Post.deleteOne( { _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }

    });

//Get - Admin Logout//
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

//Get Esenciales//
router.get('/esenciales', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Esenciales',
        }

        res.render('esenciales', {
            locals,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: true,
        })
    
    } catch (error) {
        console.log(error);
    }
    }); 

//Herramientas//
router.get('/herramientas', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Herramientas',
        }

        res.render('herramientas', {
            locals,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: true,
        })
    
    } catch (error) {
        console.log(error);
    }
    }); 
//Nuestro modo//
router.get('/acciones', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Nuestro Modo',
        }

        res.render('acciones', {
            locals,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: true,
        })
    
    } catch (error) {
        console.log(error);
    }
    }); 
//Reglas y organización//
router.get('/organizacion', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Reglas y Organización',
        }

        res.render('organizacion', {
            locals,
            layout: adminLayout,
            showSidebar: false,
            showCofre: false,
            showAdminDragon: true,
        })
    
    } catch (error) {
        console.log(error);
    }
    }); 

module.exports = router;