const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCallback, likeCallback, imageClickCallback) {
	const cardElement = cardTemplate.cloneNode(true).querySelector('.places__item');
	const cardImage = cardElement.querySelector('.card__image');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const likeButton = cardElement.querySelector('.card__like-button');

	cardElement.querySelector('.card__title').textContent = cardData.name;
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;

	deleteButton.addEventListener('click', () => deleteCallback(cardElement));
	likeButton.addEventListener('click', () => likeCallback(likeButton));
	cardImage.addEventListener('click', () => imageClickCallback(cardData));

	return cardElement;
}

function toggleLike(likeButton) {
	likeButton.classList.toggle('card__like-button_is-active');
}

const deleteCard = (cardElement) => cardElement.remove();

export {createCard, toggleLike, deleteCard};
