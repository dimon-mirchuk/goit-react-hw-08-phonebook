import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ContactListItem from "../ContactListItem";
import { useGetContactsQuery } from "../../Redux/contacts/contactsSlice";
import { filterValue } from "../../Redux/contacts/contacts-selectors";
import styles from "./ContactList.module.css";

const { list } = styles;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { data, isLoading } = useGetContactsQuery();
  const value = useSelector(filterValue);

  useEffect(() => {
    try {
      setContacts(
        data.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } catch (error) {
      return error;
    }
  }, [data, value]);

  return (
    <ul className={list}>
      {contacts.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
      {isLoading && <h2>Loading...</h2>}
    </ul>
  );
};

ContactList.propTypes = {
  value: PropTypes.string,
  useGetContactsQuery: PropTypes.func,
};

export default ContactList;
