import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit';
import { useRef } from 'react';
import { apiAddContact } from '../../redux/contacts/contactsSlice';

import css from './ContactForm.module.css'
import { selectContactsList } from '../../redux/contacts/contactSlice.selectors';


export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsList);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const onSubmit = e => {
    e.preventDefault();

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;

    const alreadyInContacts = contacts.some(contact => contact.name.toLowerCase() === name.trim().toLowerCase())
    if (alreadyInContacts) {
      alert(`Contact ${name} is already in List.`)
      return;
    }

    const newContact = {id: nanoid(), name, phone }
    dispatch(apiAddContact(newContact))

    e.currentTarget.reset();
  }

  return (
    <form className={css.form } onSubmit={onSubmit}>
      <label className={css.label } htmlFor="nameInput" pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$">Name</label>
      <input className={css.input } ref={nameRef} type="text" id="nameInput" name="name" required placeholder="John"/>               

      <label className={css.label }htmlFor="telInput">Number</label>
      <input className={css.input } ref={phoneRef} type="tel" id="telInput" name="number" pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}" required placeholder="123-45-67"/>

      <button className={css.submitBtn }type="submit">Add Contact</button>
    </form>
  )
}