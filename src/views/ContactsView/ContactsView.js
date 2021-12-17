import ContactAddForm from "../../components/ContactAddForm";
import ContactList from "../../components/ContactList";
import Filter from "../../components/Filter";
import Container from "../../components/Container";

const ContactsView = () => {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactAddForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  );
};

export default ContactsView;
