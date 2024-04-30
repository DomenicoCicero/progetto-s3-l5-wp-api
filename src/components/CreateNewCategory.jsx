import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authorizationString, baseUrl } from "../constant";

const CreateNewCategory = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createNewCategory = () => {
    fetch(`${baseUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authorizationString}`,
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setError(true);
          throw new Error("Errore nella creazione del post");
        }
      })
      .then(data => {
        console.log(data);
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createNewCategory();
    setFormData(initialState);
    setTimeout(() => {
      navigate("/categories");
    }, 2500);
  };

  return (
    <Container>
      <Row>
        {!success && !error && (
          <Col xs={10} className="offset-1">
            <Form className="text-center" onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Nome:</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Descrizione:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-4">
                Pubblica
              </Button>
            </Form>
          </Col>
        )}
        {success && (
          <Alert variant="success">
            <Alert.Heading>Categoria creata con successo!</Alert.Heading>
          </Alert>
        )}
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Errore nella creazione della categoria, riprova!</Alert.Heading>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default CreateNewCategory;
