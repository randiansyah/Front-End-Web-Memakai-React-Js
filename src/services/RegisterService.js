import http from "../http-common";

class RegisterService {
  create(data) {
    return http.post(`accounts/register`, data)
  }
}

export default new RegisterService();
