function openPopup(popup) {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', closePopUpEsc);
	popup.addEventListener('click', closePopUpOverlay);
}

function closePopUp(popupEl) {
	popupEl.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', closePopUpEsc);
	popupEl.removeEventListener('click', closePopUpOverlay);
}

function closePopUpEsc(event) {
	if (event.key === 'Escape') closePopUp(document.querySelector('.popup_is-opened'));
}

function closePopUpOverlay(event) {
	if (event.target === event.currentTarget) closePopUp(event.currentTarget);
}

export {openPopup, closePopUp};