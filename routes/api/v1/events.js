const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let allEvents = null
const getEvents = async() => {
    if (!allEvents) allEvents = await getCollection('FoodTruckListings', 'Events')
    return allEvents 
}

//GET /api/v1/events - This route should return a JSON object that 
// contains the events for the food truck. The events should contain at 
// least 5 items, and each item should have a name, location, date, and 
// time.
router.get('/', async (request, response) => {
    const allEvents = await getEvents()
    const found = await allEvents.find().toArray()
    console.log(found)
    
    if (found) response.send(found)
        else response.send({'No Menu found' : Any})
})

//GET /api/v1/events/:id - This route should return a JSON object that 
// contains the event with the specified id.
router.get('/byId/:id', async (request, response) => {
    const {id} = request.params
    const allEvents = await getEvents()
    const found = await allEvents.findOne({ _id: new ObjectId(id)})

    if (found) response.send(found)
        else response.send({'No Menu found' : Any})
})

//POST /api/v1/events - This route should add a new event to the database.
//  The request body should contain the name, location, date, and time for
//  the new event.
router.post('/', async (request, respons) => {
    const {title, image, description, dates, location, times} = request.body
    const allEvents = await getEvents()
    const {acknowledged, insertedId} = await allEvents.insertOne({title, image, description, dates, location, times})

    respons.send({acknowledged, insertedId})
})

// Default Events added to MongoDB 05/03/26
//  [
    // {
    //     "title": "Lafayette Peach Festival",
    //     "image": "https://chambermaster.blob.core.windows.net/images/customers/1234/events/11133/1200x225/Lafayette-Special-Events---Digital-Banners.png",
    //     "description": "Join us for a delightful celebration centered around the world-famous, all-natural Palisade, Colorado peaches! Indulge in delicious peach pies and peach cobbler while enjoying the vibrant atmosphere!",
    //     "dates": "August 16",
    //     "location": "Old Town Lafayette on Public Road",
    //     "times": "9:00 AM - 4:00 PM"
    // },
    // {
    //     "title": "Holiday on the Plaza",
    //     "image": "https://chambermaster.blob.core.windows.net/images/events/1234/11157/EventPhotoFull_NEW.png",
    //     "description": "The magic of the season starts at Holiday on the Plaza! Kick off the season at this festive, community-centered evening full of holiday cheer featuring one-of-a-kind gifts from local makers, fun activities and treats for all ages, capped off with the annual tree lighting at dusk. This event will be rain, snow, or shine! In the case of inclement weather we may postpone or cancel.",
    //     "dates": "Saturday Dec 6",
    //     "location": "Festival Plaza 311 S Public Road Lafayette, CO 80026",
    //     "times": "2:00 PM - 6:00 PM"
    // },
    // {
    //     "title": "Tulip Fairy & Elf Festival",
    //     "image": "https://img.ctykit.com/cdn/co-boulder/images/tulip.png",
    //     "description": "Spring officially arrives in Downtown Boulder when the beautiful, colorful Tulip Fairy, along with pint-sized fairies and elves, parade around the Pearl Street Mall "waking up the tulips." This much beloved springtime tradition features live performances, special activities for children and more than 15,000 tulips that adorn the world renowned Pearl Street Mall.",
    //     "dates": "May 3",
    //     "location": "Pearl Street Mall",
    //     "times": "1:00 PM - 5:00 pm"
    // },
    // {
    //     "title": "Boulder Creek Festival",
    //     "image": "https://bouldercreekfest.com/wp-content/uploads/2023/11/Convert-to-JPG-project.png",
    //     "description": "A locals' favorite festival featuring an artisan market, a beer festival, concerts, family activities, food and entertainment — all on the banks of Boulder Creek.",
    //     "dates": "May 22-25",
    //     "location": "Along the Boulder Creek from 9th Street to 14th Street between Canyon Blvd and Arapahoe Ave.",
    //     "times": "10:00 AM - 7:00 PM"
    // },
    // {
    //     "title": "Boulder Farmers Market",
    //     "image": "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/boulder/farmers0_a1617539-5056-a36a-07bb1c70b7b4d129.jpg",
    //     "description": "Come sample, shop, meet local farmers, smell the flowers, hear live music, sit by the creek and eat great food.",
    //     "dates": "Every Saturday, April 4-November 21",
    //     "location": "13th Street next to Central Park Boulder, CO 80302",
    //     "times": "8:00 AM - 2:00 PM"
    // }
// ]

module.exports = router