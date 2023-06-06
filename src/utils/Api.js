
export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}
  getProfile(){
     return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers
    })
    .then(this._getResponseData)
  };
  getInitialCards(){
    return fetch(`${this._baseUrl}/cards`,{
     headers: this._headers
   })
   .then(this._getResponseData)
 };
 editProfile({name,about}){
  return fetch(`${this._baseUrl}/users/me `,{
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(this._getResponseData)
 }
 editAvatar({avatar}){
  return fetch(`${this._baseUrl}/users/me/avatar `,{
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(this._getResponseData)
 }
 addCard({name,link}){
  return fetch(`${this._baseUrl}/cards`,{
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(this._getResponseData)
 }

 deleteCard(cardId){
  return fetch(`${this._baseUrl}/cards/${cardId}`,{
    method: "DELETE",
    headers: this._headers
  })
  .then(this._getResponseData)
 }

toggleLike(cardId, isLiked) {
  if (!isLiked) {
    return fetch (`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponseData)
  } else {
    return fetch (`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData)
  }
}


}
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co./v1/cohort-64',
  headers: {
    authorization: '4c274032-0b3e-4759-b4b1-a9d64f1dfaf8',
    'Content-Type': 'application/json'
  }
});


