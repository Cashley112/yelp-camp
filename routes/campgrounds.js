const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCrampground))
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send('It worked?!?');
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isAuthor, isLoggedIn, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isAuthor, isLoggedIn, catchAsync(campgrounds.renderEditForm));


module.exports = router;