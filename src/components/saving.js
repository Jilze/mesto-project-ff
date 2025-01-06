export const savingChange = (IsLoading, submitButton) => {
	submitButton.textContent = IsLoading ? 'Сохранение...' : 'Сохранить';
};