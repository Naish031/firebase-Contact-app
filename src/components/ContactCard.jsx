import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { deleteDoc } from "firebase/firestore";
import useDisclosure from "../hooks/useDisclosure";
import AddandUpdateContact from "./AddandUpdateContact";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact?.id}
        className="bg-yellow flex items-center justify-around rounded-lg min-h-[64px]"
      >
        <HiOutlineUserCircle className="h-10 w-10 text-orange" />
        <div className="flex flex-col leading-5 w-1/2">
          <h2 className="text-base font-medium">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>
        <div className="flex">
          <RiEditCircleLine onClick={onOpen} className="h-8 w-8 cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="h-8 w-8 text-purple cursor-pointer"
          />
        </div>
      </div>
      <AddandUpdateContact isUpdate isOpen={isOpen} onClose={onClose} contact={contact} />
    </>
  );
};

export default ContactCard;
