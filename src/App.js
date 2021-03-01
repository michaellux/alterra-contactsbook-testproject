import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddContact from "./components/add-contact.component";
import ContactsList from "./components/contacts-list.component";
class App extends Component {
  render() {
    return (
      <div className="container">
        <AddContact />
        <ContactsList />
      </div>
    );
  }
}

export default App;