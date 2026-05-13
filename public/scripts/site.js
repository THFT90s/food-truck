// Fetch menu and events data from mongodb for index
const getMenu = async () => {
  const response = await fetch('/api/v1/menu')
  return await response.json()
}

const getEvents = async () => {
  const response = await fetch('/api/v1/events')
  return await response.json()
}

// for the menu 
const showMenu = menuItems => {
  const menuContainer = document.querySelector('#menu-items')

  menuItems.forEach(item => {
    const card = document.createElement('div')
    card.className = 'menu-card'

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p><strong>${item.price}</strong></p>
    `

    menuContainer.appendChild(card)
  })
}

// for the events

const showEvents = events => {
  const eventsContainer = document.querySelector('#event-list')

  events.forEach(event => {
    const card = document.createElement('div')
    card.className = 'event-card'

    card.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.dates}</p>
      <a href="/event/${event._id}"><strong>View Details</strong></a>
    `

    eventsContainer.appendChild(card)
  })
}

const startHomePage = async () => {
  const menu = await getMenu()
  const events = await getEvents()

  showMenu(menu)
  showEvents(events)
}

startHomePage()


// for the event details page

const showDetails = async () => {
// get the current URL path
  const path = window.location.pathname

 //to get the id
  const id = path.replace('/events/', '')

// fetch the event mongo using the id
  const res = await fetch(`/api/v1/events/${id}`)
  const event = await res.json()

// display it on the page
  document.querySelector('#title').textContent = event.title
  document.querySelector('#date').textContent = event.dates
  document.querySelector('#time').textContent = event.times
  document.querySelector('#location').textContent = event.location
  document.querySelector('#description').textContent = event.description
}

// calling it on the event details page
  if (window.location.pathname.startsWith('/events/')) {
  showDetails()
}

//admin: form submission to add new menu items and events to the database
  const startAdminPage = () => {
  const menuForm = document.querySelector('#addmenuform')
  const eventForm = document.querySelector('#addeventform')

  const menuMessage = document.querySelector('#menu-message')
  const eventMessage = document.querySelector('#event-message')

  // menu posting
  menuForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const title = document.querySelector('#menu-title').value
    const description = document.querySelector('#menu-description').value
    const price = document.querySelector('#menu-price').value
    const image = document.querySelector('#menu-image').value

    const res = await fetch('/api/v1/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, price, image })
    })

    await res.json()
    menuMessage.textContent = "Menu item added!"
    menuForm.reset()
  })

  // events posting
  eventForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const etitle = document.querySelector('#event-title').value
    const elocation = document.querySelector('#event-location').value
    const edate = document.querySelector('#event-date').value
    const etime = document.querySelector('#event-time').value
    const edescription = document.querySelector('#event-description').value

    const res = await fetch('/api/v1/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: etitle, location: elocation, dates: edate, times: etime, description: edescription })
    })

    await res.json()

    eventMessage.textContent = "Event added successfully!"
    eventForm.reset()
  })
} 

if (window.location.pathname === '/admin') {
  startAdminPage()
}