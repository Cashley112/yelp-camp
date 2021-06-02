const axios = require('axios');

const campgrounds = async function () {
    const res = await axios.get('https://developer.nps.gov/api/v1/campgrounds?limit=500&api_key=Xokt6muKOVVUUFcVQUWHpUSIt0FbP1Us2aBGROLh');
    const campgroundsData = res.data.data;
    // let counter = 0
    const campgroundsArray = [];
    for (let i = 0; i < campgroundsData.length; i++) {
        if (campgroundsData[i].latitude && campgroundsData[i].longitude){
            let dict = {};
            dict['name'] = campgroundsData[i].name;
            dict['description'] = campgroundsData[i].description;
            dict['longitude'] = campgroundsData[i].longitude;
            dict['latitude'] = campgroundsData[i].latitude;
            if (campgroundsData[i].addresses[0]){
                dict['location'] = `${campgroundsData[i].addresses[0].city}, ${campgroundsData[i].addresses[0].stateCode}`;
                // counter += 1;
            } else {
                dict['location'] = campgroundsData[i].name;
            }
            campgroundsArray.push(dict);
        }
    }
    return campgroundsArray;
}

// campgrounds()
//     .then(data => {
//         console.log('Success!')
//         camps = data;
//         return camps;
//     })
//     .catch(err => {
//         console.log("An Error Occured", err)
//     })

exports.campgrounds = campgrounds;




    


