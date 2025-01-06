import '../pages/index.css';
import {changeCardLikeStatus, createCard, eraseCard} from "../components/card";
import {addAnimationToPopups, handleKeydown, handleOverlayClick, hidePopup, showPopup} from "../components/modal";
import {clearFormValidationErrors, enableValidation} from "../components/validation";
import {validationConfig} from "../components/config";
import {fetchCards, fetchUserProfile, newCard, updateProfileAvatar, updateUserProfile} from "../components/api";
import {savingChange} from "../components/saving";

// Константы
const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupEditProfileImage = document.querySelector('.popup_type_edit-profile-image');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');
const popupCardButtonOpen = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const placesList = document.querySelector('.places__list');
const userProfileForm = document.querySelector('form[name="edit-profile"]');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const changeProfileImageForm = document.querySelector('form[name="edit-profile-image"]');
const userProfileImage = document.querySelector('.profile__image');
const profileImgUrlInput = document.querySelector('input[name="profile-img-link"]');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');
const newCardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector('input[name="place-name"]');
const cardLinkInput = document.querySelector('input[name="link"]');
const popupsArr = document.querySelectorAll('.popup');
const popupImageElement = document.querySelector('.popup_type_image');
const contentPopupDescription = popupImageElement.querySelector('.popup__caption');
const contentPopupImage = popupImageElement.querySelector('.popup__image');

let userId = "";

addAnimationToPopups(popupsArr);

const openImagePopup = (cardValue) => {
	contentPopupDescription.textContent = cardValue.name;
	contentPopupImage.src = cardValue.link;
	contentPopupImage.alt = cardValue.name;
	showPopup(popupImageElement, handleKeydown, handleOverlayClick);
};

Promise.all([fetchUserProfile(), fetchCards()])
	.then(([profileInfo, initialCards]) => {
		userId = profileInfo._id;
		profileName.textContent = profileInfo.name;
		profileAbout.textContent = profileInfo.about;
		userProfileImage.style.backgroundImage = `url('${profileInfo.avatar}')`;
		initialCards.forEach(cardValue => {
			placesList.append(createCard(cardValue, eraseCard, changeCardLikeStatus, openImagePopup, userId));
		});
	})
	.catch(err => console.log(err));

popupProfileButtonOpen.addEventListener('click', () => {
	fillProfileForm();
	clearFormValidationErrors(popupProfile, validationConfig);
	showPopup(popupProfile, handleKeydown, handleOverlayClick);
});

popupCardButtonOpen.addEventListener('click', () => {
	clearFormValidationErrors(popupCard, validationConfig);
	showPopup(popupCard, handleKeydown, handleOverlayClick);
});

document.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('popup__close')) {
		hidePopup(evt.target.closest('.popup_is-opened'));
	}
});

userProfileImage.addEventListener('click', () => {
	clearFormValidationErrors(popupEditProfileImage, validationConfig);
	showPopup(popupEditProfileImage, handleKeydown, handleOverlayClick);
});

const fillProfileForm = () => {
	profileNameInput.value = profileName.textContent;
	profileDescriptionInput.value = profileAbout.textContent;
};

const handleFormSubmit = (form, apiCall, onSuccess) => (evt) => {
	evt.preventDefault();
	const submitButton = form.querySelector('.popup__button');
	savingChange(true, submitButton);
	apiCall()
		.then(onSuccess)
		.catch(err => console.log(err))
		.finally(() => savingChange(false, submitButton));
};

userProfileForm.addEventListener('submit', handleFormSubmit(
	userProfileForm,
	() => updateUserProfile(profileNameInput.value, profileDescriptionInput.value),
	(profileInfo) => {
		profileName.textContent = profileInfo.name;
		profileAbout.textContent = profileInfo.about;
		hidePopup(popupProfile);
	}
));

changeProfileImageForm.addEventListener('submit', handleFormSubmit(
	changeProfileImageForm,
	() => updateProfileAvatar(profileImgUrlInput.value),
	(res) => {
		userProfileImage.style.backgroundImage = `url('${res.avatar}')`;
		hidePopup(popupEditProfileImage);
		changeProfileImageForm.reset();
	}
));

newCardForm.addEventListener('submit', handleFormSubmit(
	newCardForm,
	() => newCard(cardNameInput.value, cardLinkInput.value),
	(cardValue) => {
		placesList.prepend(createCard(cardValue, eraseCard, changeCardLikeStatus, openImagePopup, userId));
		hidePopup(popupCard);
		newCardForm.reset();
	}
));

enableValidation(validationConfig);