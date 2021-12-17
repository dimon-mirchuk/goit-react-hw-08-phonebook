import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import ContactAddForm from "./components/ContactAddForm";
// import ContactList from "./components/ContactList";
// import Filter from "./Filter";
// import Container from "./components/Container";
import ContactsView from "./views/ContactsView/ContactsView";

function App() {
  return (
    // <Container>
    //   <h1>Phonebook</h1>
    //   <ToastContainer />
    //   <ContactAddForm />
    //   <h2>Contacts</h2>
    //   <Filter />
    //   <ContactList />
    // </Container>
    <>
      <ContactsView />
      <ToastContainer />
    </>
  );
}

export default App;
