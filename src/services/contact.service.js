import http from "../http-common";

class ContactDataService {
  getAll() {
    return http.get("/contacts");
  }

  get(id) {
    return http.get(`/contacts/${id}`);
  }

  create(data) {
    return http.post("/contacts", data);
  }

  delete(id) {
    return http.delete(`/contacts/${id}`);
  }

  deleteAll() {
    return http.delete(`/contacts`);
  }
}

export default new ContactDataService();