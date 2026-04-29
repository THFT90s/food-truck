const router = require('express').Router()
const { getCollection, ObjectID } = require('../../../dbconnect')

let fullMenu = null
const getMenu = async() => {
    if (!fullMenu) fullMenu = await getCollection()
    return fullMenu 
}

//GET /api/v1/menu - This route should return a JSON object that contains 
// the menu items for the food truck. The menu should contain at least 5 
// items, and each item should have a name, description, price, and url 
// for an image.
router.get('menu', async (request, response) => {
    const collection = await getMenu()
    const found = await collection.find().toArray()
    //console.log(found)
    
    if (found) response.send(found)
        else response.send({'No Menu found' : Any})
})

//GET api/v1/menu/:id - This route should return a JSON object that 
// contains the menu item with the specified id.
router.get('menu/:id', async (request, response) => {
    const {id} = request.params
    const collection = await getMenu()
    const found = await collection.findOne({_id: new ObjectId(id)})
    //console.log(found)

    if (found) response.send(found)
        else response.send({'No Menu found' : Any})
})

//POST /api/v1/menu - This route should add a new menu item to the 
// database. The request body should contain the name, description, 
// price, and image URL for the new menu item.
router.post('add', async (request, respons) => {
    const {variable, variable, variable} = request.body
    const collection = await getMenu()
    const {acknowledged, insertedId} = await collection.insertOne()({variable, variable, variable})

    respons.send({acknowledged, insertedId})
})
