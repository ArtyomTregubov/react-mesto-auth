class Auth {
  constructor() {
    this.BASE_URL = "https://auth.nomoreparties.co";
  }

  async _send(endpoint, headers, payload) {
    const url = `${this.BASE_URL}${endpoint}`;
    const res = await fetch(url, { ...payload, ...headers });
    if (res.ok) return await res.json();
    throw new Error(`Ошибка ${payload.method} url=${url} status=${res.status}`);
  }

  async signin(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "POST", body: body };
    return await this._send("/signin", HEADERS, payload);
  }

  async signup(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "POST", body: body };
    return await this._send("/signup", HEADERS, payload);
  }

  async checkToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      HEADERS["headers"] = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      return await this._send("/users/me", HEADERS, { method: "GET" });
    }
  }
}

let HEADERS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const AUTH = new Auth();
export default AUTH;
