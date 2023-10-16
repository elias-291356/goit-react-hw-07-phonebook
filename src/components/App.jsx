import 'bulma/css/bulma.css';
import React from 'react';
import { Filter } from './Filter/Filter';
import { Contacts } from './Contacts/Contacts';
import { PhonebookItem } from './PhonebookItem/PhonebookItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHandleAddContact,
  setOnDeleteContact,
  setOnFilterContact,
} from 'redux/phoneBookReducer';

export const App = () => {
  const contacts = useSelector(state => state.phoneBook.contacts);
  const filter = useSelector(state => state.phoneBook.filter);

  const dispatch = useDispatch();

  const handleAddContact = newContact => {
    dispatch(setHandleAddContact(newContact));
  };

  const onDeleteContact = id => {
    dispatch(setOnDeleteContact(id));
  };

  const onFilterContact = event => {
    const inputFilterValue = event.target.value;
    dispatch(setOnFilterContact(inputFilterValue));
  };

  const filtered = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
      contact.number.includes(filter)
    );
  });

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div className="box">
        <PhonebookItem onAddContact={handleAddContact} contacts={contacts} />
        <Filter onChange={onFilterContact} value={filter} />
        <Contacts contacts={filtered} onDeleteContact={onDeleteContact} />
      </div>
    </div>
  );
};
