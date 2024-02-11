import { ButtonLoader } from 'components'
import css from './ContactItem.module.css'
import { STATUSES } from 'utils/constants'

export const ContactItem = ({ contact, onDeleteContact, idToDelete, status }) => {
  return (
    <li className={css.contactItem} >
      <p className={css.contactText}>{contact.name}: {contact.number}</p>
      <button className={css.deleteBtn} disabled={status===STATUSES.pending} onClick={() => onDeleteContact(contact.id)}>{idToDelete === contact.id ? <ButtonLoader height={6} width={16} color={'white'} /> : 'Remove'}</button>
    </li>)
}