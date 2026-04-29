const router = require('express').Router()
const { getCollection, ObjectID } = require('../../../dbconnect')

let events = null
const getEvents = async() => {
    if (!events) events = await getCollection()
    return events 
}

//GET /api/v1/events - This route should return a JSON object that 
// contains the events for the food truck. The events should contain at 
// least 5 items, and each item should have a name, location, date, and 
// time.
router.get('events', async (request, response) => {
    const collection = await getEvents()
    const found = await collection.find().toArray()
    //console.log(found)
    
    if (found) response.send(found)
        else response.send({'No Menu found' : Any})
})

//GET /api/v1/events/:id - This route should return a JSON object that 
// contains the event with the specified id.
router.get('events/:id', async (request, response) => {
    const {id} = request.params
    const collection = await getEvents()
    const found = await collection.findOne({_id: new ObjectId(id)})
    //console.log(found)

    if (found) response.send(found)
        else response.send({'No Menu found' : Any})
})

//POST /api/v1/events - This route should add a new event to the database.
//  The request body should contain the name, location, date, and time for
//  the new event.
router.post('events', async (request, respons) => {
    const {variable, variable, variable} = request.body
    const collection = await getEvents()
    const {acknowledged, insertedId} = await collection.insertOne()({variable, variable, variable})

    respons.send({acknowledged, insertedId})
})