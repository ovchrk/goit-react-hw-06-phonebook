import React from 'react';
import css from '../List/List.module.css';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice/contactsSlice';

export const List = () => {
  const contacts = useSelector(state => state.contacts.contact);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      {filteredContacts.length > 0 ? (
        <ul className={css.box}>
          {filteredContacts?.map(({ id, name, number }) => (
            <li key={id} className={css.contacts__item}>
              &#8728; {name}: {number}{' '}
              <button
                type="button"
                className={css.button}
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.box}>Contacts not found</div>
      )}
    </div>
  );
};
// List.propTypes = {
//   filteredContacts: PropTypes.array.isRequired,
//   handleDelete: PropTypes.func.isRequired,
// };
