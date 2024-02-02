import "../index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal, handleCloseByOverlay } from "./modal.js";

//Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const cardsContainer = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEdit = document.forms.namedItem("edit-profile");
const buttonEdit = document.querySelector(".profile__edit-button");
const editProfileForm = document.querySelector("#editProfileForm");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.forms["new-place"];
const popupList = document.querySelectorAll(".popup");
const placeName = document.querySelector(".popup__input_type_card-name");
const imageLink = document.querySelector(".popup__input_type_url");
const imageOpen = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");

// Вывести карточки на страницу
initialCards.forEach(({ link, name }) => {
  cardsContainer.append(
    createCard(link, name, deleteCard, likeCard, openCardImage)
  );
});

// Открыть форму редактирования
buttonEdit.addEventListener("click", () => {
  openModal(popupTypeEdit);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
});

// Открыть форму редактирования с фото
addButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

// Функция изменения информации
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(popupTypeEdit);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupTypeEdit.addEventListener("click", handleCloseByOverlay);
// Функция сохранения новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardImage = imageLink.value;
  const cardTitle = placeName.value;

  cardsContainer.prepend(
    createCard(cardImage, cardTitle, deleteCard, likeCard, openCardImage)
  );

  formNewCard.reset();
  closeModal(popupNewCard);
}

formNewCard.addEventListener("submit", handleNewCardSubmit);
popupNewCard.addEventListener("click", handleCloseByOverlay);

// Функция клик по изображению
export function openCardImage(link, name) {
  openModal(popupTypeImage);
  imageOpen.src = link;
  imageOpen.alt = "фото " + name;
  imagePopupCaption.textContent = name;
}
popupTypeImage.addEventListener("click", handleCloseByOverlay);

// Найти все попапы и добавить обработчики событий к кнопкам закрытия
popupList.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(popup));
  }
});
