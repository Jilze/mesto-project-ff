const apiEndpoint = 'https://mesto.nomoreparties.co/v1/wff-cohort-29';
const apiConfig = {
	headers: {
		authorization: 'a55a2095-fd09-4162-9112-7539a82ed24b',
		'Content-Type': 'application/json'
	}
};

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(res.statusText);

const fetchUserProfile = () => {
	return fetch(`${apiEndpoint}/users/me`, {
		method: "GET",
		headers: apiConfig.headers
	})
		.then((res) => handleResponse(res));
};

const fetchCards = () => {
	return fetch(`${apiEndpoint}/cards`, {
		method: "GET",
		headers: apiConfig.headers
	})
		.then((res) => handleResponse(res));
};
const updateUserProfile = (name, about) => {
	return fetch(`${apiEndpoint}/users/me`, {
		method: 'PATCH',
		headers: apiConfig.headers,
		body: JSON.stringify({
			name: name,
			about: about
		})
	})
		.then((res) => handleResponse(res));
};

const newCard = (name, link) => {
	return fetch(`${apiEndpoint}/cards`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			name: name,
			link: link
		})
	})
		.then((res) => handleResponse(res));
};

const removeCard = (removedCardId) => {
	return fetch(`${apiEndpoint}/cards/${removedCardId}`, {
		method: "DELETE",
		headers: apiConfig.headers
	})
		.then((res) => handleResponse(res))
};

const putLikeCard = (cardId) => {
	return fetch(`${apiEndpoint}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: apiConfig.headers
	})
		.then((res) => handleResponse(res))
};

const removeLikeFromCard = (cardId) => {
	return fetch(`${apiEndpoint}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: apiConfig.headers
	})
		.then((res) => handleResponse(res))
};

const updateProfileAvatar = (avatarUrl) => {
	return fetch(`${apiEndpoint}/users/me/avatar`, {
		method: 'PATCH',
		headers: apiConfig.headers,
		body: JSON.stringify({
			avatar: avatarUrl
		})
	})
		.then((res) => handleResponse(res))
};

export {
	fetchUserProfile,
	fetchCards,
	updateUserProfile,
	newCard,
	removeCard,
	putLikeCard,
	removeLikeFromCard,
	updateProfileAvatar
};