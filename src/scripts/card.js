import { cardTemplate, openCardImage } from "./index.js";
// Функция создания карточки
function createCard(cardImage, cardTitle, deleteCard, likeCard, openCardImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = cardImage;
  cardImageElement.alt = "фото " + cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCard(likeButton));
  cardImageElement.addEventListener("click", () =>
    openCardImage(cardImage, cardTitle)
  );
  return cardElement;
}

// Функция удаления карточки
function deleteCard(deleteButton) {
  const card = deleteButton.closest(".card");
  card.remove();
}

// Функция лайка карточки
function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
export { createCard, deleteCard, likeCard };
