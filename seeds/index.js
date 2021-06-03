const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');
const npsApi = require('./npsApi');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    const camps = await npsApi.campgrounds();
    for (let i = 0; i < camps.length; i++) {
        // const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 25) + 10;
        const camp = new Campground({
            // your USER ID
            author: '60a6d8e12c40f558a66a31d8',
            // location: `${cities[random1000].city}, ${cities[random1000].state}`,
            location: camps[i].location,
            title: camps[i].name,
            description: camps[i].description,
            price,
            geometry: { 
                type: 'Point',
                coordinates:  [
                    camps[i].longitude,
                    camps[i].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/disr9lri4/image/upload/v1621966609/YelpCamp/uby85m1s9d7jxzb3j2ss.jpg',
                  filename: 'YelpCamp/uby85m1s9d7jxzb3j2ss'
                },
                {
                  url: 'https://res.cloudinary.com/disr9lri4/image/upload/v1621970451/YelpCamp/xiajnhpsfs7tnjogucln.jpg',
                  filename: 'YelpCamp/xiajnhpsfs7tnjogucln'
                }
              ]
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

