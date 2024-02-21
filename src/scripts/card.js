import { deleteMyCard, putLike, deleteLike } from "./api";

const createCard = (
  cardTemplate,
  cardTitle,
  deleteCard,
  likeCard,
  openCardImage,
  userId
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = cardTitle.link;
  cardImageElement.alt = "фото " + cardTitle.name;
  cardElement.querySelector(".card__title").textContent = cardTitle.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-counter");

  if (userId === cardTitle.owner._id) {
    deleteButton.addEventListener("click", (evt) =>
      deleteCard(evt, cardTitle._id)
    );
  } else {
    deleteButton.setAttribute("hidden", true);
  }

  likeCount.textContent = cardTitle.likes.length;
  cardTitle.likes.some((like) => {
    if (like._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  

  likeButton.addEventListener("click", (evt) =>
    likeCard(evt, cardTitle._id, likeCount)
  );
  cardImageElement.addEventListener("click", () =>
    openCardImage(cardTitle.link, cardTitle.name)
  );

  return cardElement;
};

const deleteCard = (event, id) => {
  deleteMyCard(id)
    .then(() => {
      event.target.closest(".places__item").remove();
    })
    .catch((error) => {
      console.log(error);
    });
};

const addLike = (evt, id, count) => {
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : putLike;
  likeMethod(id)
    .then((data) => {
      evt.target.classList.toggle("card__like-button_is-active");
      count.textContent = data.likes.length;
    })
    .catch((error) => {
      console.log(error);
});
};

export { createCard, deleteCard, addLike };
