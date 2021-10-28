const formAdd = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');
const offerPrice = formAdd.querySelector('#price');
const address = formAdd.querySelector('#address');
const appartmentType = formAdd.querySelector('#type');
const roomNumber = formAdd.querySelector('#room_number');
const capacity = Array.from(document.querySelector('#capacity').children);
const disabledFilelds = document.querySelectorAll('fieldset, select.map__filter');

const AppartmentType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const RoomsNumber = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const onRoomNumberChage = (evt) => {
  const roomNumberValue = evt.target.value;
  const guestNumberValue = RoomsNumber[roomNumberValue];
  capacity.forEach((option) => {
    const isNecessary = guestNumberValue.some((necessaryValue) => parseInt(option.value, 10) === necessaryValue ? 1 : 0);
    if (!isNecessary) {
      option.style.display = 'none';
    } else {
      option.style.display = 'block';
      option.selected = true;
    }
  });
};
roomNumber.addEventListener('change', onRoomNumberChage);

const onAppartmentTypeChange = (evt) => {
  const minPrice = AppartmentType[evt.target.value];
  offerPrice.min = minPrice;
  offerPrice.placeholder = minPrice;
};
appartmentType.addEventListener('change', onAppartmentTypeChange);

const deleteFormListener = () => {
  appartmentType.removeEventListener('change', onAppartmentTypeChange);
  roomNumber.removeEventListener('change', onRoomNumberChage);
};

const setDisabledState = () => {
  disabledFilelds.forEach((field) => {
    field.disabled = !field.disabled;
  });
};

const activate = () => {
  formAdd.classList.remove('ad-form--disabled');
  filter.classList.remove('map__filters--disabled');
  setDisabledState();
  address.readOnly = true;
};

const deactivate = () => {
  deleteFormListener();
  formAdd.classList.add('ad-form--disabled');
  filter.classList.add('map__filters--disabled');
  setDisabledState();
  address.readOnly = false;
};

// deactivate();
// activate();