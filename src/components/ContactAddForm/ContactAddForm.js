import {
  useGetContactsQuery,
  useAddContactMutation,
} from "../../Redux/contacts/contactsSlice";
import { toast } from "react-toastify";
import styles from "./ContactAddForm.module.css";

const { form, label, input, button } = styles;

function ContactAddForm() {
  const [createContact, { isLoading }] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name.value;
    const phone = e.currentTarget.phone.value;
    const newContact = {
      name,
      phone,
    };
    if (contacts.some((contact) => name === contact.name)) {
      toast.error(`${name} is already in contacts`);
      e.currentTarget.reset();
      return;
    }
    createContact(newContact);
    toast.success(`${name} added to contact list`);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={form}>
      <label className={label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ]) ? [a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          placeholder="Ivan Ivanov"
          className={input}
        />
      </label>
      <label className={label}>
        Number
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          placeholder="+7 (999) 999-99-99"
          className={input}
        />
      </label>
      <button type="submit" disabled={isLoading} className={button}>
        Add contact
      </button>
    </form>
  );
}

export default ContactAddForm;
