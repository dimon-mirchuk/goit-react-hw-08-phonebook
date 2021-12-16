import PropTypes from "prop-types";
import { useDeleteContactMutation } from "../../Redux/contacts/contactsSlice";
import styles from "./ContactListItem.module.css";

const { text, span, button, item } = styles;

const ContactListItem = ({ contact }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  return (
    <li id={contact.id} className={item}>
      <p className={text}>
        {contact.name}: <span className={span}>{contact.phone}</span>
      </p>
      <button
        type="button"
        onClick={() => deleteContact(contact.id)}
        disabled={isDeleting}
        title="Delete"
        className={button}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object,
  deleteContact: PropTypes.func,
};

export default ContactListItem;
