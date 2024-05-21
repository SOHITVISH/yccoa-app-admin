// import node module libraries
import { useState } from "react";
import {

  Toast,

  Container,
} from "react-bootstrap";



const Toasts = ({ message }) => {


  return (
    <Container fluid className="p-6">
      <Toast className="mb-4">
        <Toast.Body>{message}</Toast.Body>
      </Toast>

    </Container>
  );
};

export default Toasts;
