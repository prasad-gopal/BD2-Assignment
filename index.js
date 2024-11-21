const express = require('express');
const { resolve } = require('path');
//import hotels from '/hotels.js';
//import * as hotels from 'hotels.js';
const hotels = require('./hotels');

const app = express();
let cors = require('cors');
app.use(cors());
const port = 3000;

app.use(express.static('static'));

app.get('/hotels/sort/pricing', (req, res) => {
  let pricing = req.query.pricing;
  let copyHotels = hotels.slice();
  let result;
  if (pricing.toLowerCase() === 'low-to-high') {
    result = copyHotels.toSorted(sortByAscending);
  } else if(pricing.toLowerCase() === 'high-to-low') {
    result = copyHotels.toSorted(sortByDescending);
  }
  res.json({ hotels: result });
});

function sortByAscending(hotels1, hotels2) {
  return hotels1.price - hotels2.price;
}
function sortByDescending(hotels1, hotels2) {
  return hotels2.price - hotels1.price;
}

app.get('/hotels', (req, res) => {
  res.json({ hotels: hotels });
});

app.get('/hotels/sort/rating', (req, res) => {
  let rating = req.query.rating;
  let copyHotels = hotels.slice();
  let result;
  if (rating.toLowerCase() === 'low-to-high') {
    result = copyHotels.sort(sortByRatingInAscending);
  } else if (rating.toLowerCase() === 'high-to-low') {
    result = copyHotels.sort(sortByRatingInDescending);
  }
  res.json({ hotels: result });
}); // /hotels/sort/rating?rating=Low-To-HIGH
function sortByRatingInAscending(hotels1, hotels2) {
  return hotels1.rating - hotels2.rating;
}
function sortByRatingInDescending(hotels1, hotels2) {
  return hotels2.rating - hotels1.rating;
}

app.get('/hotels/sort/reviews', (req, res) => {
  let reviews = req.query.reviews;
  let copyHotels = hotels.slice();
  let result;
  if (reviews.toLowerCase() === 'least-to-most') {
    result = copyHotels.sort(sortByReviewsInAscendingOrder);
  } else if (reviews.toLowerCase() === 'most-to-least') {
    result = copyHotels.sort(sortByReviewsInDescendingOrder);
  }
  res.json({ hotels: result });
});
function sortByReviewsInAscendingOrder(hotels1, hotels2) {
  return hotels1.reviews - hotels2.reviews;
}
function sortByReviewsInDescendingOrder(hotels1, hotels2) {
  return hotels2.reviews - hotels1.reviews;
}

app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = req.query.amenity;
  let copyHotels = hotels.slice();
  let result = copyHotels.filter((hotel) => filterByAmenity(hotel, amenity));
  res.json({ hotels: result });
});
function filterByAmenity(hotel, amenity) {
  return hotel.amenity.toLowerCase() === amenity;
}

app.get('/hotels/filter/country', (req, res) => {
  let country = req.query.country;
  let result = hotels.filter((hotel) => filterByCountry(hotel, country));
  res.json({ hotels: result });
});
function filterByCountry(hotel, country) {
  return hotel.country.toLowerCase() === country;
}

function filterByCategory(hotel, category) {
  return hotel.category.toLowerCase() === category;
}
app.get('/hotels/filter/category', (req, res) => {
  let category = req.query.category;
  let result = hotels.filter((hotel) => filterByCategory(hotel, category));
  res.json({ hotels: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
