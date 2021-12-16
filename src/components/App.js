import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ContactAddForm from "./ContactAddForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Container from "./Container";

function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ToastContainer />
      <ContactAddForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  );
}

export default App;
