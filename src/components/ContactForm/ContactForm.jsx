import { useDispatch, useSelector } from 'react-redux'
import { apiAddContact } from '../../redux/contacts/contactsSlice';
import { selectContactsList, selectStatus } from '../../redux/contacts/contactSlice.selectors';

import { STATUSES } from 'utils/constants';
import css from './ContactForm.module.css'
import { ButtonLoader } from 'components';
import { useState } from 'react';


export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsList);
  const status = useSelector(selectStatus)

  const [isAddingContact, setIsAddingContact] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;

    const alreadyInContacts = contacts.some(contact => contact.name.toLowerCase() === name.trim().toLowerCase())
    if (alreadyInContacts) {
      alert(`Contact ${name} is already in List.`)
      return;
    }
    setIsAddingContact(true)

    const newContact = { name, number }
    dispatch(apiAddContact(newContact)).then(() => {
      setIsAddingContact(false)
    })

    e.currentTarget.reset();
  }

  return (
    <form className={css.form } onSubmit={onSubmit}>
      <label
        className={css.label}
        htmlFor="nameInput"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$">
        Name
      </label>
      <input className={css.input}
        type="text"
        id="nameInput"
        name="name"
        required
        placeholder="John" />               

      <label
        className={css.label}
        htmlFor="telInput">
        Number
      </label>
      <input
        className={css.input}
        type="tel"
        id="telInput"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        required
        placeholder="123-45-67" />

      <button className={css.submitBtn} type="submit">
        {isAddingContact ? <ButtonLoader width={20} height={6} color={'white'}/> : 'Add Contact'}</button>
    </form>
  )
}