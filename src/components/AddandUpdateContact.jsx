import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddandUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={validationSchema}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            if (isUpdate) {
              updateContact(values, contact.id);
            } else addContact(values);
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="border border-black rounded-md h-10 pl-2"
              />

              <p className="text-red-600">
                <span className="font-bold text-sm">
                  <ErrorMessage name="name" />
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border border-black rounded-md h-10 pl-2"
              />
              <p className="text-red-600">
                <span className="font-bold text-sm">
                  <ErrorMessage name="email" />
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="bg-orange border px-3 py-1.5 rounded-lg self-end"
            >
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddandUpdateContact;
