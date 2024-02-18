import "../index.css";
import { createCard, deleteCard, addLike } from "./card.js";
import { openModal, closeModal, handleCloseByOverlay } from "./modal.js";
import {
  clearValidation,
  enableValidation,
  validationConfig,
  toggleButtonState,
} from "./validation.js";
import {
  getCards,
  getUserInfo,
  editUserInfo,
  patchAvatar,
  addNewCard,
} from "./api.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEdit = document.forms["edit-profile"];
const buttonEdit = document.querySelector(".profile__edit-button");
const editProfileForm = document.getElementById("editProfileForm");
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
const popupAvatarEdit = document.querySelector(".popup_type_avatar");
const avatar = document.querySelector(".profile__image");
const popupAvatarEditOpen = document.querySelector(".profile__image_cover");
const formAvatar = document.querySelector('form[name="newAvatar"]');
const avatarLinkInput = formAvatar.querySelector(".popup__input_type_url");
const avatarFormSubmitButton = formAvatar.querySelector(".popup__button");
const cardFormSubmitButton = formNewCard.querySelector(".popup__button");
const profileFormSubmitButton = formEdit.querySelector(".popup__button");

let userId;
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    avatar.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;

    cardsData.forEach((card) => {
      cardsContainer.appendChild(
        createCard(
          cardTemplate,
          card,
          deleteCard,
          addLike,
          openCardImage,
          userId
        )
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

const isLoading = (button, isLoading) => {
  if (isLoading) {
    button.disabled = true;
    button.textContent = "Сохранение...";
  } else {
    button.disabled = false;
    button.textContent = "Сохранить";
  }
};

// Открыть форму редактирования
buttonEdit.addEventListener("click", () => {
  clearValidation(popupTypeEdit, validationConfig);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  toggleButtonState(editProfileForm, validationConfig);
  openModal(popupTypeEdit);
});

// Открыть форму редактирования с фото
addButton.addEventListener("click", () => {
  clearValidation(popupTypeEdit, validationConfig);
  toggleButtonState(editProfileForm, validationConfig);
  openModal(popupNewCard);
});

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  isLoading(profileFormSubmitButton, true);
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  editUserInfo(nameValue, jobValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupTypeEdit);
      formEdit.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading(profileFormSubmitButton, false);
    });
};

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupTypeEdit.addEventListener("click", handleCloseByOverlay);

const handleNewCardSubmit = (evt) => {
  evt.preventDefault();
  isLoading(cardFormSubmitButton, true);
  const cardImage = imageLink.value;
  const cardTitle = placeName.value;
  addNewCard(cardTitle, cardImage)
    .then((newCard) => {
      const createdCard = createCard(
        cardTemplate,
        newCard,
        deleteCard,
        addLike,
        openCardImage,
        userId
      );
      cardsContainer.prepend(createdCard);
      closeModal(popupNewCard);
      formNewCard.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading(cardFormSubmitButton, false);
    });
};

formNewCard.addEventListener("submit", handleNewCardSubmit);
popupNewCard.addEventListener("click", handleCloseByOverlay);

// Функция клик по изображению
function openCardImage(link, name) {
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

popupAvatarEditOpen.addEventListener("click", () => {
  clearValidation(formEdit, validationConfig);
  openModal(popupAvatarEdit);
  formAvatar.reset();
});

popupAvatarEdit.addEventListener("click", handleCloseByOverlay);

const handleFormEditAvatar = (evt) => {
  evt.preventDefault();
  isLoading(avatarFormSubmitButton, true);
  const linkValue = avatarLinkInput.value;
  avatar.style.backgroundImage = `url('${linkValue}')`;
  patchAvatar(linkValue)
    .then((res) => {
      avatar.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(popupAvatarEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading(avatarFormSubmitButton, false);
    });
};

popupAvatarEdit.addEventListener("submit", handleFormEditAvatar);

enableValidation(validationConfig);
