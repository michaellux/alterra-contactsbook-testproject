import React, { Component } from "react";
import ContactDataService from "../services/contact.service";

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.newContact = this.newContact.bind(this);

    this.state = {
      id: null,
      name: "",
      phone: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  saveContact() {
    var data = {
      name: this.state.name,
      phone: this.state.phone
    };

    ContactDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newContact() {
    this.setState({
      id: null,
      name: "",
      phone: "",
      submitted: false
    });
  }

  render() {
    return (
      <>
          <div className="contactbook__addContact addContact">
              <div className="addContact__titleblock titleblock">
                <span className="addContact__title title">Добавить контакт</span>
              </div>
              <form className="addContact__form form">
                <input
                  placeholder="Имя" aria-label="Имя"
                  type="text"
                  className="form-control form__nameField"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />

                <input
                  placeholder="Телефон" aria-label="Телефон"
                  type="tel"
                  className="form-control form__phoneField"
                  id="phone"
                  required
                  value={this.state.phone}
                  onChange={this.onChangePhone}
                  name="phone"
                />
              <button onClick={this.saveContact} className="btn form__addButton">
                Добавить
              </button>
              </form>
          </div>
      </>
    );
  }
}