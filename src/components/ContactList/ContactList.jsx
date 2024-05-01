import { useDispatch, useSelector } from 'react-redux';
import {
  apiDeleteContact,
  apiGetContacts,
} from '../../redux/contacts/contactsSlice';
import { useEffect, useState } from 'react';
import { selectContactsFilter } from '../../redux/filter/filtlerSlice.selectors';
import {
  selectError,
  selectStatus,
} from '../../redux/contacts/contactSlice.selectors';
import { ContactItem } from 'components';
import { STATUSES } from 'utils/constants';
import css from './ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();

  const [idToDelete, setIdToDelete] = useState(null);

  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectContactsFilter);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    // const isConfirmed = window.confirm('Are you sure want to delete this contact?');
    // if (isConfirmed) {
    setIdToDelete(id);
    dispatch(apiDeleteContact(id));
    // }
  };

  return (
    <>
      {status === STATUSES.error && <div>{error}</div>}
      <ul className={css.contactList}>
        {filteredContacts && filteredContacts.length > 0
          ? filteredContacts.map(contact => {
              return (
                <ContactItem
                  key={contact._id}
                  contact={contact}
                  onDeleteContact={onDeleteContact}
                  idToDelete={idToDelete}
                  status={status}
                ></ContactItem>
              );
            })
          : 'Contacts list is empty.'}
      </ul>
    </>
  );
};
