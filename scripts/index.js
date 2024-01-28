// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard (cardImage, cardTitle, deleteCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImageElement = cardElement.querySelector(".card__image");
    cardImageElement.src = cardImage;
    cardImageElement.alt = 'фото ' + cardTitle;
    cardElement.querySelector(".card__title").textContent = cardTitle;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener("click", () => deleteCard(deleteButton));
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton) {
    const card = deleteButton.closest(".card");
    card.remove();
  }
  
  // @todo: Вывести карточки на страницу
    initialCards.forEach(({ link, name }) => {
      placesList.append(createCard(link, name, deleteCard));
  });
