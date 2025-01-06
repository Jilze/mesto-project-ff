const togglePopupVisibility = (popup) => {
	if (popup.classList.contains('popup_is-opened')) {
		popup.classList.remove('popup_is-opened');
	} else {
		popup.classList.add('popup_is-opened');
	}
};

const addAnimationToPopups = (popups) => {
	for (const popup of popups) {
		popup.classList.add('popup_is-animated');
	}
};

const showPopup = (popup, handleKeydown, handleOverlayClick) => {
	togglePopupVisibility(popup);
	document.addEventListener('keydown', handleKeydown);
	popup.addEventListener('click', handleOverlayClick);
};

const hidePopup = (popup) => {
	togglePopupVisibility(popup);
	document.removeEventListener('keydown', handleKeydown);
	popup.removeEventListener('click', handleOverlayClick);
};

const handleKeydown = (evt) => {
	if (evt.key === 'Escape') {
		const popupIsOpened = document.querySelector('.popup_is-opened');
		if (popupIsOpened) {
			hidePopup(popupIsOpened);
		}
	}
};

const handleOverlayClick = (evt) => {
	if (evt.currentTarget === evt.target) {
		hidePopup(evt.target);
	}
};

export {showPopup, hidePopup, handleKeydown, handleOverlayClick, addAnimationToPopups};