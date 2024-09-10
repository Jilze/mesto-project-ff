import './index.css';
import {initialCards} from "../components/cards.js";
import {createCard, deleteCard, toggleLike} from "../components/card";
import {closePopUp, openPopup} from "../components/modal";

const placesList = document.querySelector('.places__list');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');
const popupCardButtonOpen = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;
const newCardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = newCardForm.querySelector('input[name="place-name"]');
const cardLinkInput = newCardForm.querySelector('input[name="link"]');

// Открытие изображения в попапе
function openImagePopup(cardData) {
	const popupImageElement = document.querySelector('.popup_type_image');
	popupImageElement.querySelector('.popup__image').src = cardData.link;
	popupImageElement.querySelector('.popup__caption').textContent = cardData.name;
	openPopup(popupImageElement);
}

// Функция для заполнения формы профиля
function populateProfileForm() {
	profileNameInput.value = profileName.textContent;
	profileDescriptionInput.value = profileAbout.textContent;
}

// Обработчик для открытия попапа профиля
popupProfileButtonOpen.addEventListener('click', () => {
	populateProfileForm();
	openPopup(popupProfile);
});

// Открытие/закрытие попапов
popupProfileButtonOpen.addEventListener('click', () => openPopup(popupProfile));
popupCardButtonOpen.addEventListener('click', () => openPopup(popupCard));
document.querySelectorAll('.popup__close').forEach(button => {
	button.addEventListener('click', () => closePopUp(button.closest('.popup')));
});

// Обновление профиля
profileForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	profileName.textContent = profileNameInput.value;
	profileAbout.textContent = profileDescriptionInput.value;
	closePopUp(popupProfile);
});

// Добавление новой карточки
newCardForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const cardData = {name: cardNameInput.value, link: cardLinkInput.value};
	const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
	placesList.prepend(cardElement);
	closePopUp(popupCard);
	newCardForm.reset();
});

// Инициализация карточек
document.addEventListener('DOMContentLoaded', () => {
	initialCards.forEach(cardData => placesList.appendChild(createCard(cardData, deleteCard, toggleLike, openImagePopup)));
});


