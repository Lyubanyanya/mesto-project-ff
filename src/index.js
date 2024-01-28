import "./index.css";
import { initialCards } from "./cards.js";
import { createCard, likeCard, deleteCard } from "./card.js";
import {
  openModal,
  closeModal,
  handleCloseByClick,
  handleCloseByEsc,
} from "./components/modal.js";

//Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const placesList = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEdit = document.forms.namedItem("edit-profile");
const buttonEdit = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.forms["new-place"];
const placeName = document.querySelector(".popup__input_type_card-name");
const imageLink = document.querySelector(".popup__input_type_url");
const imageOpen = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");

// Вывести карточки на страницу
initialCards.forEach(({ link, name }) => {
  placesList.append(createCard(link, name, deleteCard));
});

// Открыть форму редактирования
buttonEdit.addEventListener("click", () => {
  openModal(popupTypeEdit, handleCloseByClick, handleCloseByEsc);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
});

// Открыть форму редактирования с фото
addButton.addEventListener("click", () => {
  openModal(popupNewCard, handleCloseByClick, handleCloseByEsc);
});

// Функция изменения информации
function handleFormSubmit(evt) {
  evt.preventDefault(); //
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const nameElement = document.querySelector(".profile__title");
  const jobElement = document.querySelector(".profile__description");

  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
}

formElement.addEventListener("submit", handleFormSubmit);

// Функция сохранения новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardImage = imageLink.value;
  const cardTitle = placeName.value;

  placesList.prepend(createCard(cardImage, cardTitle, deleteCard, likeCard));

  formNewCard.reset();
}

formNewCard.addEventListener("submit", handleNewCardSubmit);

// Функция клик по изображению
export function openCardImage(link, name) {
  openModal(popupTypeImage, handleCloseByClick, handleCloseByEsc);
  imageOpen.src = link;
  imagePopupCaption.textContent = name;
}
