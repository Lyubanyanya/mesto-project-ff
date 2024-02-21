// Функция открытия popup
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseByEsc);
}

//  Функция закрытия popup
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEsc);
}

function handleCloseByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Обработчик закрытия на оверлей
function handleCloseByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

//  Экспортируемые функции
export { openModal, closeModal, handleCloseByOverlay };