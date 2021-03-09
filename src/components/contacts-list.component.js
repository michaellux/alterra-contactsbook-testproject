import React, { Component } from "react";
import ContactDataService from "../services/contact.service";

export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveContacts = this.retrieveContacts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    this.retrieveContacts();
  }

  retrieveContacts() {
    ContactDataService.getAll()
      .then(response => {
        this.setState({
          contacts: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveContacts();
    this.setState({
      currentContact: null
    });
  }

  deleteContact(id) {
    ContactDataService.delete(id)
      .catch(e => {
        console.log(e);
      });
    this.setState((state) => {
      return {contacts: state.contacts.filter(el => el.id != id)}
    });
  }

  render() {
    const { contacts } = this.state;
    return (
      <div className="contactbook__list list">
        <div className="list__titleblock titleblock">
          <h1 className="list_title title">Список контактов</h1>
        </div>
        <ul className="list__contacts">
          {contacts &&
            contacts.map((contact, index) => (
              <li
                className=
                "contacts__item item"
                key={index}
              >
                  <span className="item__name">
                    {`${contact.firstName} ${contact.lastName}`}
                  </span>
                  <button
                    className="item__deletebutton"
                    onClick={() => this.deleteContact(contact.id)}
                  >×</button>
                  <span className="item__phone">
                    {contact.phone}
                  </span>
              </li>))
          }
        </ul>
      </div>
    );
  }
}