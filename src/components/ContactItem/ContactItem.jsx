import { ButtonLoader } from 'components'
import css from './ContactItem.module.css'

export const ContactItem = ({ contact, onDeleteContact, deletingContact }) => {
  return (
    <li className={css.contactItem} >
      <p className={css.contactText}>{contact.name}: {contact.phone}</p>
      <button className={css.deleteBtn} onClick={() => onDeleteContact(contact.id)}>{deletingContact === contact.id ? <ButtonLoader height={6} width={16} color={'white'} /> : 'Remove'}</button>
    </li>)
}