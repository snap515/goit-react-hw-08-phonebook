import { ButtonLoader } from 'components'
import css from './ContactItem.module.css'

export const ContactItem = ({ contact, onDeleteContact, idToDelete }) => {
  return (
    <li className={css.contactItem} >
      <p className={css.contactText}>{contact.name}: {contact.number}</p>
      <button className={css.deleteBtn} onClick={() => onDeleteContact(contact.id)}>{idToDelete === contact.id ? <ButtonLoader height={6} width={16} color={'white'} /> : 'Remove'}</button>
    </li>)
}