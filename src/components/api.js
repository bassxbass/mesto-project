
// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
//   headers: {
//     authorization: "22162963-fa24-4ef5-ad47-93b0e908a5f5",
//     "Content-Type": "application/json",
//   },
// };

export default class Api {
  constructor({ baseUrl, headers }) {
      this.baseUrl = baseUrl,
      this.headers = headers
  }

  // Метод для обработки ответа от сервера
  _getRes = (res) => {
      if (res.ok) {
          return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для получения списка карточек с сервера
  getCards = () => {
      return fetch(`${this.baseUrl}/cards`, {
          method: 'GET',
          headers: this.headers
      })
          .then(res => this._getRes(res))
  }

  // Метод для получения информации о пользователе с сервера
  getProfileInfo = () => {
      return fetch(`${this.baseUrl}/users/me`, {
          headers: this.headers
      })
          .then(res => this._getRes(res))
  }

  // Метод для добавления карточки на сервер
  appendCard = (cardName, cardLink) => {
      return fetch(`${this.baseUrl}/cards`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
              name: cardName,
              link: cardLink
          })
      })
          .then(res => this._getRes(res))
  }

  // Метод для удаления карточки с сервера
  deleteCard = (cardId) => {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this.headers
      })
          .then(res => this._getRes(res))
  }

  // Метод для обновления аватара пользователя на сервере
  updateProfilePhoto = (newUrl) => {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
              avatar: newUrl
          })
      })
          .then(res => this._getRes(res))
  }

  // Метод для обновления информации о пользователе на сервере
  updateProfileInfo = (newName, newAbout) => {
      return fetch(`${this.baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
              name: newName,
              about: newAbout
          })
      })
          .then(res => this._getRes(res))
  }

  // Метод для отправки лайка карточке на сервер
  putLike = (cardId) => {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this.headers
      })
          .then(res => this._getRes(res))
  }

  // Метод для удаления лайка с карточки на сервере
  deleteLike = (cardId) => {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this.headers
      })
          .then(res => this._getRes(res))
  }
}
