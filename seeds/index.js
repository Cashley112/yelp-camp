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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 25) + 10;
        const camp = new Campground({
            author: '60a6d8e12c40f558a66a31d8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, reiciendis voluptatibus tenetur explicabo nam corporis. Velit ex, aliquam voluptatum, voluptas doloremque natus vitae amet cum dolorem, aspernatur aperiam eum voluptatem.Maxime optio unde, neque inventore consectetur necessitatibus quos minus, impedit esse doloremque iste ipsum est eligendi? Atque vero id aut alias. Eum ab magni eligendi, vel nemo saepe ipsum repellendus!',
            price
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

