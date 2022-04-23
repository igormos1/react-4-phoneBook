import React, { useEffect, useState} from 'react';
// Components
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
// Utilities
//import { filterContacts } from '../utilities';




const App =()=> {
  
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parce(localStorage.getItem('contacrs'));
    if (contacts) {
      setContacts(contacts);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function handleSubmit(contact) {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number
    };

    if (contact.some(contact => contact.name === newContact.name)) {
      alert(`${contact.name} is alredy in contacts`);
      return;
    };

    setContacts([newContact, ...contacts]);
  }
  

  function onChangeFilter(e) {
    setFilter(e.target.value);
  }

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter));
  }

  const deleteCont = (id) => {
    setContacts(contacts.filter(contact => id !== contact.id));
  }

  const visibleContacts = getVisibleContacts();

   return (
      <div className={styles.container}>
      <ContactForm onSubmit={handleSubmit}/>
      
        <Filter value={filter} onChange={onChangeFilter} />      
        <h1>Contacts</h1>
        <ContactsList contacts={visibleContacts} onDelete={deleteCont}/>
      
      </div> 
    );
  
};

export default App;
  


  