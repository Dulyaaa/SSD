import axios from "axios";

class AuthService {
  getUser(email) {
    return axios.get(`https://localhost:8080/user/user/${email}`);
  }

  getAuth() {
    return axios.get("https://localhost:8080/api/oauth/getAuthURL/");
  }

  getToken(code) {
    return axios.post("https://localhost:8080/api/oauth/getToken", code);
  }

  setUserRole(email) {
    return axios
      .get(`https://localhost:8080/user/getrole/${email}`)
      .then((response) => {
        if (response.status == 200) {
          //Store jwt token
          localStorage.setItem("userToken", response.headers.get("auth-token"));
          return "ok";
        } else {
          console.log(response);
          throw response;
        }
      });
  }

  // getToken(code) {
  //     return axios.request({
  //         url: 'https://localhost:8080/api/oauth/getToken',
  //         data: code,
  //         contentType: "application/x-www-form-urlencoded; charset=utf-8, application/json",
  //         crossDomain: true,
  //         method: 'POST',
  //     })
  // }

  getUserInfo() {
    return axios.request({
      url: "https://localhost:8080/api/oauth/getuserInfo",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
  }

  sendToken(userId, token) {
    return axios.request({
      url: `https://localhost:8080/user/update/${userId}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
  }
}

export default new AuthService();
