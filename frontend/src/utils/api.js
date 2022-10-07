class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  } 

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }
  
  getCards() {
    return fetch(`${this._url}/cards` , {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  register({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  authorize({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  };

  getEmail(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000', 
  headers: {
    // authorization:'f7a8d2c2-99fc-4e55-b877-773be6a3ed35',
    'Content-Type': 'application/json'
  }
});

export default api;