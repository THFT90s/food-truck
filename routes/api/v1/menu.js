const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let fullMenu = null
const getMenu = async() => {
    if (!fullMenu) fullMenu = await getCollection('FoodTruckListings', 'menuItems')
    return fullMenu 
}

//GET /api/v1/menu - This route should return a JSON object that contains 
// the menu items for the food truck. The menu should contain at least 5 
// items, and each item should have a name, description, price, and url 
// for an image.
router.get('/', async (request, response) => {
    const collection = await getMenu()
    const found = await collection.find().toArray()
    //console.log(found)
    
    if (found) response.send(found)
        else response.send({'No Menu found' : Any})
})

//GET api/v1/menu/:id - This route should return a JSON object that 
// contains the menu item with the specified id.
router.get('/:id', async (request, response) => {
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
router.post('/', async (request, respons) => {
    const {title, image, description, price} = request.body
    const collection = await getMenu()
    const {acknowledged, insertedId} = await collection.insertOne({title, image, description, price})

    respons.send({acknowledged, insertedId})
})


// following menu items added to MondoDB 05/03/26
// [
//     {
//         "title": "Bourbon Chicken Large",
//         "image": "https://d1w7312wesee68.cloudfront.net/ZWaZQjDNMHbkk6PO56OkzJ2Jy42rOLwnEE7oOocYHM0/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-60172000000000000/menu/images/item-7a81de0b-2226-4fb0-9828-2cfd749f1d6d.jpg",
//         "description": "Chicken over Rice with Bourbon Sauce.  Choice of Side - Mac & Cheese, Cajun Potatoes, Grilled Veggies.",
//         "price": "$14.25"
//     },
//     {
//         "title": "Bahn Mi Bowl Large",
//         "image": "https://d1w7312wesee68.cloudfront.net/gK-pJioh91dFmbx4ORKj4Y_8A9_9foi00TMwvtRgOU0/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-60172000000000000/menu/images/item-002d0d68-5471-4687-8dc1-834076a97e16.jpg",
//         "description": "Charred Chicken, Spicy Aioli, Pickled Carrots and Daikon, Cilantro, Cucumbers and Jalapenos all over a bowl of rice.",
//         "price": "$14.25"
//     },
//     {
//         "title": "Teriyaki Chicken Bowl Large",
//         "image": "https://d1w7312wesee68.cloudfront.net/wtPlgGJsb6FyacjXYlCeVD3KIHryvyyHWa1yipbb_-k/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-60172000000000000/menu/items/6/item-300000012394416486_1627436224.jpg",
//         "description": "Grilled Chicken with Grilled Zucchini, Onions and Carrots over a bed of rice with Sweet & Tangy Teriyaki Sauce over the top!",
//         "price": "$14.25"
//     },
//     {
//         "title": "12'' Large Buffalo Chicken Finger Sub",
//         "image": "https://d1w7312wesee68.cloudfront.net/XPf5zPGWzuZW2GVyyRq50pR0NhTOCidgnbklBoSnmHc/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-60172000000000000/menu/items/4/item-300000009841751674_1617477250.jpg",
//         "description": "Fried Chicken Strips dripping in Ranch and Buffalo Sauce, Lettuce and Tomatoes on a toasty hoagie roll.",
//         "price": "$13.25"
//     },
//     {
//         "title": "Chicken Gyro w/ Fries",
//         "image": "https://d1w7312wesee68.cloudfront.net/hPkEzskxsjkCSn7FQx4zFLx1YriWwCEVj_ickPif2S0/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-60172000000000000/menu/items/8/item-300000012208510928_1626380066.jpg",
//         "description": "Grilled Chicken, Creamy Garlic Sauce, Onions, Lettuce, Tomatoes and Fries all wrapped in a warm fluffy Pita.  Comes with a side of fries!",
//         "price": "$13.50"
//     },
// ]

module.exports = router