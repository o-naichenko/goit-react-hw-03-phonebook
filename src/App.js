import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './App.module.css';
import ContactForm from './components/Contact-form';
import Filter from './components/Filter';
import ContactList from './components/Contact-list';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  static propTypes = {
    value: PropTypes.string,
    newContact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  };
  addContact = newContact => {
    if (this.checkContactUniqueness(newContact)) {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };
  checkContactUniqueness(newContact) {
    return this.state.contacts.every(
      contact => contact.name.toLowerCase() !== newContact.name.toLowerCase(),
    );
  }
  deleteContact = e => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== e.currentTarget.id,
    );
    this.setState({
      contacts: filteredContacts,
    });
  };
  filterContacts = () => {
    if (this.state.filter.length === 0) {
      return this.state.contacts;
    } else {
      return this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
      );
    }
  };
  setFilterValue = value => this.setState({ filter: value });
  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={s.App}>
        <h1 className={s.header}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={s.header}>Contacts</h2>
        <Filter onChange={this.setFilterValue} />
        <ContactList
          contacts={filter.length === 0 ? contacts : this.filterContacts()}
          onClick={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
