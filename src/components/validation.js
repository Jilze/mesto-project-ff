const showInputValidationErrors = (input, form, settings) => {
	const errorMessage = form.querySelector(`.${input.id}-error`);
	input.classList.add(settings.inputErrorClass);
	errorMessage.textContent = input.validationMessage;
};

const hideInputValidationErrors = (input, form, settings) => {
	const errorMessage = form.querySelector(`.${input.id}-error`);
	input.classList.remove(settings.inputErrorClass);
	errorMessage.textContent = '';
};

const hasInvalidInput = (inputElementsArr) => {
	return inputElementsArr.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};

const toggleButtonState = (form, inputList, settings) => {
	const button = form.querySelector(settings.submitButtonSelector);
	if (hasInvalidInput(inputList)) {
		button.setAttribute('disabled', true);
		button.classList.add(settings.inactiveButtonClass);
	} else {
		button.removeAttribute('disabled');
		button.classList.add(settings.inactiveButtonClass);
	}
};

const checkInputValidity = (form, input, settings) => {
	if (input.validity.patternMismatch) {
		input.setCustomValidity(input.dataset.errorMessage);
	} else {
		input.setCustomValidity("")
	}
	if (!input.validity.valid) {
		showInputValidationErrors(input, form, settings);
	} else {
		hideInputValidationErrors(input, form, settings);
	}
};

const enableInputValidation = (form, settings) => {
	const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
	toggleButtonState(form, inputList, settings);

	inputList.forEach(input => {
		input.addEventListener('input', () => {
			checkInputValidity(form, input, settings);
			toggleButtonState(form, inputList, settings);
		});
	});
};

const enableValidation = (settings) => {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach(form => {
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		enableInputValidation(form, settings);
	});
};

const clearFormValidationErrors = (form, settings) => {
	const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
	inputList.forEach(input => {
		hideInputValidationErrors(input, form, settings);
	});
	toggleButtonState(form, inputList, settings);
};

export {enableValidation, clearFormValidationErrors};