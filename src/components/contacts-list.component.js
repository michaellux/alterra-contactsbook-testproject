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
        console.log(response.data);
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
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { contacts, currentContact } = this.state;
    console.log(contacts);
    console.log(currentContact);
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Contacts List</h4>

          <ul className="list-group">
            {contacts &&
              contacts.map((contact, index) => (
                <li
                  className=
                  "list-group-item "
                  key={index}
                >
                  <div>
                    <div>
                      {`${contact.firstName} ${contact.lastName}`}
                    </div>
                    <div>
                      {contact.phone}
                    </div>
                    <button
                      className="badge badge-danger mr-2"
                      onClick={() => this.deleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>))
            }
          </ul>
        </div>
      </div>
    );
  }
}