import { turnOnMap } from './map.js';
const MAX_OFFERS = 10;
const DEFAULT_VALUE = 'any';
const priceMap = {
  'low': {
    FROM: 0,
    TO: 10000,
  },
  'middle': {
    FROM: 10000,
    TO: 50000,
  },
  'high': {
    FROM: 50000,
    TO: Infinity,
  },
};
const filters = Array.from(document.querySelector('.map__filters').children);


// const filterRules = {
//   'housing-type': (data, filter) => {
//     console.log(filter.value === data.offer.type);
//     filter.value === data.offer.type;
//   },
//   'housing-price': (data, filter) =>
//     (priceMap[filter.value].FROM === data.offer.price && priceMap[filter.value].TO > data.offer.price),
//   'housing-rooms': (data, filter) => {
//     console.log(filter.value === String(data.offer.rooms));
//     filter.value === String(data.offer.rooms);
//   },
//   'housing-guests': (data, filter) => filter.value === String(data.offer.guests),
//   'housing-features': (data, filter) => {
//     const activeCheckboxes = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

//     return activeCheckboxes.every((checkbox) =>
//       (data.offer.features.some((feature) => feature === checkbox.value)));
//   },
// };


const filterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) =>
    (priceMap[filter.value].FROM === data.offer.price && priceMap[filter.value].TO > data.offer.price),
  'housing-rooms': (data, filter) => filter.value === String(data.offer.rooms),
  'housing-guests': (data, filter) => filter.value === String(data.offer.guests),
  'housing-features': (data, filter) => {
    const activeCheckboxes = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    return activeCheckboxes.every((checkbox) =>
      (data.offer.features.some((feature) => feature === checkbox.value)));
  },
};


const filterData = (data) => {
  const filterOffers = [];

  for (let i = 0; filterOffers.length < MAX_OFFERS; i++) {
    const result = filters.filter((filter) => {

      //=================
      console.log(i);
      console.log(filter.value, DEFAULT_VALUE, filter.value === DEFAULT_VALUE);
      //=================

      filter.value === DEFAULT_VALUE ? true : filterRules[filter.id](data[i], filter);
    });

    if (result) {
      filterOffers.push(data[i]);
    }

    //=================
    console.log(filterOffers);
    //=================
  }
  turnOnMap(filterOffers);
};


export { filterData };

