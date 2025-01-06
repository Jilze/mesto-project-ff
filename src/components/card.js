import {putLikeCard, removeCard, removeLikeFromCard} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

const isLiked = (card, userId) => {
	return card.likes.some(like => like._id === userId);
};

const createCard = (cardData, handleDeleteCard, handleLikeCard, openImagePopup, userId) => {
	const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const likeButton = cardElement.querySelector('.card__like-button');
	const likeCounter = cardElement.querySelector('.card__like-counter');

	cardTitle.textContent = cardData.name;
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardElement.dataset.id = cardData._id;

	if (userId === cardData.owner._id) {
		deleteButton.addEventListener('click', (evt) => {
			handleDeleteCard(evt, cardData._id);
		});
	} else {
		deleteButton.remove();
	}

	cardImage.addEventListener('click', () => {
		openImagePopup(cardData);
	})

	likeCounter.textContent = cardData.likes.length;
	if (isLiked(cardData, userId)) {
		likeButton.classList.add('card__like-button_is-active');
	}

	likeButton.addEventListener('click', () => {
		handleLikeCard(cardData, userId, cardElement, likeButton, likeCounter);
	});

	return cardElement;
};

const eraseCard = (evt, cardId) => {
	const cardElement = evt.target.closest('.card');
	removeCard(cardId)
		.then(() => {
			cardElement.remove();
		})
		.catch(err => console.log(err));
};

const changeCardLikeStatus = (cardData, userId, cardElement, likeButton, likeCounter) => {
	const likeAction = isLiked(cardData, userId) ? removeLikeFromCard : putLikeCard;

	likeAction(cardData._id)
		.then((res) => {
			likeButton.classList.toggle('card__like-button_is-active');
			likeCounter.textContent = res.likes.length;
			cardData.likes = res.likes;
		})
		.catch(err => console.log(err));
};

export {createCard, eraseCard, changeCardLikeStatus};