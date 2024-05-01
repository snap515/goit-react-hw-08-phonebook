import { ButtonLoader } from 'components';
import css from './ContactItem.module.css';
import { STATUSES } from 'utils/constants';

export const ContactItem = ({
  contact,
  onDeleteContact,
  idToDelete,
  status,
}) => {
  return (
    <li className={css.contactItem}>
      <p className={css.contactText}>
        {contact.name}: {contact.phone}
      </p>
      <button
        className={css.deleteBtn}
        disabled={status === STATUSES.pending}
        onClick={() => onDeleteContact(contact._id)}
      >
        {idToDelete === contact._id ? (
          <ButtonLoader height={6} width={16} color={'white'} />
        ) : (
          'Remove'
        )}
      </button>
    </li>
  );
};
