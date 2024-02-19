import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddandUpdateContact from "./components/AddandUpdateContact";
import useDisclosure from "./hooks/useDisclosure";
import NotFoundContact from "./components/NotFoundContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    try {
      const getContacts = async () => {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setContacts(contactsList);
          return contactsList;
        });
      };
      getContacts();
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      const filteredContacts = contactsList.filter((contact) => {
        return contact.name.toLowerCase().includes(value.toLowerCase());
      });
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <main className="max-w-[370px] mx-auto px-2">
        <Navbar />
        <div className="flex items-center relative">
          <CiSearch className="h-8 w-8 ml-1 text-white absolute" />
          <input
            type="text"
            placeholder="Search Contact"
            onChange={filterContacts}
            className="flex-grow h-10 px-2 border border-white rounded-md bg-transparent text-white pl-10 placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
          <FaCirclePlus
            onClick={onOpen}
            className="h-10 w-10 ml-3 text-white cursor-pointer "
          />
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard contact={contact} key={contact.id} />
            ))
          )}
        </div>
      </main>
      <AddandUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
