const apiEndpoint = 'https://mesto.nomoreparties.co/v1/wff-cohort-29';
const apiConfig = {
	headers: {
		authorization: 'a55a2095-fd09-4162-9112-7539a82ed24b',
		'Content-Type': 'application/json'
	}
};

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(res.statusText);

const request = (endpoint, options = {}) => {
	const url = `${apiEndpoint}${endpoint}`;
	const config = { ...options, headers: apiConfig.headers };
	return fetch(url, config).then(handleResponse);
};

const fetchUserProfile = () => request('/users/me', { method: "GET" });

const fetchCards = () => request('/cards', { method: "GET" });

const updateUserProfile = (name, about) => {
	return request('/users/me', {
		method: 'PATCH',
		body: JSON.stringify({ name, about })
	});
};

const newCard = (name, link) => {
	return request('/cards', {
		method: 'POST',
		body: JSON.stringify({ name, link })
	});
};

const removeCard = (removedCardId) => {
	return request(`/cards/${removedCardId}`, { method: "DELETE" });
};

const putLikeCard = (cardId) => {
	return request(`/cards/likes/${cardId}`, { method: "PUT" });
};

const removeLikeFromCard = (cardId) => {
	return request(`/cards/likes/${cardId}`, { method: "DELETE" });
};

const updateProfileAvatar = (avatarUrl) => {
	return request('/users/me/avatar', {
		method: 'PATCH',
		body: JSON.stringify({ avatar: avatarUrl })
	});
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