class Api {
  constructor(headers, cardsURL, userURL, changeAvatarUrl) {
    this.headers = headers;
    this.cardsURL = cardsURL;
    this.userURL = userURL;
    this.changeAvatarUrl = changeAvatarUrl;
  }

  async _send(url, payload) {
    const res = await fetch(url, { ...payload, ...this.headers });
    if (res.ok) return await res.json();
    throw new Error(`Ошибка ${payload.method} url=${url} status=${res.status}`);
  }

  async getInitialCards() {
    return await this._send(this.cardsURL, { method: "GET" });
  }

  async getUserInfo() {
    return await this._send(this.userURL, { method: "GET" });
  }

  async updateUserInfo(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "PATCH", body: body };
    return await this._send(this.userURL, payload);
  }

  async addNewCard(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "POST", body: body };
    return await this._send(this.cardsURL, payload);
  }

  async changeAvatar(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "PATCH", body: body };
    return await this._send(this.changeAvatarUrl, payload);
  }

  async deleteCard(cardId) {
    const url = `${this.cardsURL}/${cardId}`;
    const payload = { method: "DELETE" };
    return await this._send(url, payload);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    try {
      return isLiked ? await API.deleteLike(cardId) : await API.addLike(cardId);
    } catch (err) {
      console.log(err);
    }
  }

  async addLike(cardId) {
    const url = `${this.cardsURL}/${cardId}/likes`;
    const payload = { method: "PUT" };
    return await this._send(url, payload);
  }

  async deleteLike(cardId) {
    const url = `${this.cardsURL}/${cardId}/likes`;
    const payload = { method: "DELETE" };
    return await this._send(url, payload);
  }
}

const TOKEN = "85f45188-40df-476e-9439-a079efcb1c8d";
const HEADERS = {
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
};
const cohortId = "cohort-66";
const cardsURL = `https://mesto.nomoreparties.co/v1/${cohortId}/cards`;
export const userURL = `https://nomoreparties.co/v1/${cohortId}/users/me`;
export const changeAvatarUrl = `${userURL}/avatar`;

const API = new Api(HEADERS, cardsURL, userURL, changeAvatarUrl);
export default API;
