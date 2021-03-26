import axios from "axios";

const API_URL = "/.netlify/functions/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          window.sessionStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    window.sessionStorage.removeItem("user");
  }

  register(username, email, password, firm) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firm
    });
  }

  getCurrentUser() {
    return JSON.parse(window.sessionStorage.getItem('user'));
  }
}

export default new AuthService();
