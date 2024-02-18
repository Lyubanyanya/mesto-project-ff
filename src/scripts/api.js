const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "211945ba-4d78-4548-8a25-411e9e62ddd1",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Загрузка информации о пользователе с сервера
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

// Загрузка карточек с сервера
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

// Редактирование профиля
const editUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then(handleResponse);
};

//Добавление новой карточки
const addNewCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then(handleResponse);
};

//Отображение количества лайков карточки

const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  }).then(handleResponse);
};

//Cнятие лайка
const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(handleResponse);
};

//Удаление карточки
const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

// Обновление аватара пользователя
const patchAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(handleResponse);
};

export {
  getCards,
  getUserInfo,
  deleteMyCard,
  putLike,
  deleteLike,
  editUserInfo,
  patchAvatar,
  addNewCard,
};
