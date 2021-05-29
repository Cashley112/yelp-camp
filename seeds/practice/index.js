const axios = require('axios');

const campgrounds = async function () {
    const res = await axios.get('https://developer.nps.gov/api/v1/campgrounds?limit=500&api_key=Xokt6muKOVVUUFcVQUWHpUSIt0FbP1Us2aBGROLh');
    const campgrounds = res.data.data;
    // let counter = 0
    const campgroundsArray = [];
    for (let i = 0; i < campgrounds.length; i++) {
        if (campgrounds[i].latitude && campgrounds[i].longitude){
            let dict = {};
            dict['name'] = campgrounds[i].name;
            dict['description'] = campgrounds[i].description;
            dict['longitude'] = campgrounds[i].longitude;
            dict['latitude'] = campgrounds[i].latitude;
            if (campgrounds[i].addresses[0]){
                dict['location'] = `${campgrounds[i].addresses[0].city}, ${campgrounds[i].addresses[0].stateCode}`;
                // counter += 1;
            } else {
                dict['location'] = campgrounds[i].name;
            }
            campgroundsArray.push(dict);
            // counter += 1;
        }
    }
    return campgroundsArray;
}


