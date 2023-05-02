import { BASE_URL } from '../utils/settings';

class Api {
  constructor(params) {
    this._baseUrl = params.baseUrl;
  }

  createQueueFetch() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getUserInfo() {
    const url = `${this._baseUrl}users/me`;

    return this._createFetch(url, 'GET');
  }

  setUserAvatar(dataAvatar) {
    const url = `${this._baseUrl}users/me/avatar`;

    return this._createFetch(url, 'PATCH', dataAvatar);
  }

  setUserInfo(dataUser) {
    const url = `${this._baseUrl}users/me`;

    return this._createFetch(url, 'PATCH', dataUser);
  }

  getInitialCards() {
    const url = `${this._baseUrl}cards`;

    return this._createFetch(url, 'GET');
  }

  addPlace(dataCards) {
    const url = `${this._baseUrl}cards`;

    return this._createFetch(url, 'POST', dataCards);
  }

  deleteCard(dataCardId) {
    const url = `${this._baseUrl}cards/${dataCardId}`;

    return this._createFetch(url, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    const url = `${this._baseUrl}cards/${cardId}/likes`;
    const typeMethod = isLiked ? 'DELETE' : 'PUT';

    return this._createFetch(url, typeMethod);
  }

  _createFetch(url, typeMethod, dataBody) {
    const token = localStorage.getItem('jwt');

    return fetch(url, {
      method: typeMethod,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: dataBody ? JSON.stringify(dataBody) : null,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export const api = new Api({baseUrl: BASE_URL});
