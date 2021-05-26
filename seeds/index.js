const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');


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
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 25) + 10;
        const camp = new Campground({
            // your USER ID
            author: '60a6d8e12c40f558a66a31d8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, reiciendis voluptatibus tenetur explicabo nam corporis. Velit ex, aliquam voluptatum, voluptas doloremque natus vitae amet cum dolorem, aspernatur aperiam eum voluptatem.Maxime optio unde, neque inventore consectetur necessitatibus quos minus, impedit esse doloremque iste ipsum est eligendi? Atque vero id aut alias. Eum ab magni eligendi, vel nemo saepe ipsum repellendus!',
            price,
            geometry: { 
                type: 'Point',
                coordinates:  [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/disr9lri4/image/upload/v1621966609/YelpCamp/uby85m1s9d7jxzb3j2ss.jpg',
                  filename: 'YelpCamp/uby85m1s9d7jxzb3j2ss'
                },
                {
                  url: 'https://res.cloudinary.com/disr9lri4/image/upload/v1621966609/YelpCamp/i41iiiriou3bqijbam4q.jpg',
                  filename: 'YelpCamp/i41iiiriou3bqijbam4q'
                }
              ]
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

