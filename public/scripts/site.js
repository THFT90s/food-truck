// Future dynamic menu structure:

// const menuItems = [
//   { name: "", description: "", price: 0.00, image: "" }
// ];
//
// const menuContainer = document.querySelector("#menu-items");
//
// menuItems.forEach(item => {
//   const card = document.createElement("article");
//   card.classList.add("card");
//
//   card.innerHTML = `
//     <img src="${item.image || '/images/default.jpg'}" alt="${item.name}">
//     <h3>${item.name}</h3>
//     <p>${item.description}</p>
//     <p>$${item.price.toFixed(2)}</p>
//   `;
//
//   menuContainer.appendChild(card);
// });


// Future dynamic events structure:

// Expected event object:
// {
//   id: number,
//   name: string,
//   date: string
// }

// const events = [
//   { id: 1, name: "Friday Night Market", date: "April 26, 2026" },
//   { id: 2, name: "Downtown Lunch Stop", date: "April 28, 2026" }
// ];

// const eventContainer = document.querySelector("#event-list");

// events.forEach(event => {
//   const link = document.createElement("a");
//   link.href = `/event/${event.id}`;
//   link.classList.add("event-link");

//   const card = document.createElement("article");
//   card.classList.add("card");

//   card.innerHTML = `
//     <h3>${event.name}</h3>
//     <p>${event.date}</p>
//   `;

//   link.appendChild(card);
//   eventContainer.appendChild(link);
// });

// Future dynamic event detail structure:

// Example event detail object:
// {
//   id: 1,
//   name: "Friday Night Market",
//   date: "April 26, 2026",
//   time: "6:00 PM",
//   location: "Riverfront Park"
// }

// const eventId = window.location.pathname.split("/").pop();

// const eventName = document.querySelector("#event-name");
// const eventDate = document.querySelector("#event-date");
// const eventTime = document.querySelector("#event-time");
// const eventLocation = document.querySelector("#event-location");

// Example later:
// fetch(`/api/v1/events/${eventId}`)
//   .then(response => response.json())
//   .then(event => {
//     eventName.textContent = event.name;
//     eventDate.textContent = `Date: ${event.date}`;
//     eventTime.textContent = `Time: ${event.time}`;
//     eventLocation.textContent = `Location: ${event.location}`;
//   });