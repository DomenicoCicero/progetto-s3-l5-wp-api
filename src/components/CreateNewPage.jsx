import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authorizationString, baseUrl } from "../constant";

const CreateNewPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const initialState = {
    title: "",
    content: "",
    resume: "",
    status: "publish",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createNewPage = () => {
    fetch(`${baseUrl}/pages`, {
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
    createNewPage();
    setFormData(initialState);
    setTimeout(() => {
      navigate("/page");
    }, 2500);
  };

  return (
    <Container>
      <Row>
        {!success && !error && (
          <Col xs={10} className="offset-1">
            <Form className="text-center" onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Titolo:</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Contenuto:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="resume">
                <Form.Label>Riassunto:</Form.Label>
                <Form.Control type="text" name="resume" value={formData.resume} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="publish">Pubblicato</option>
                  <option value="draft">Bozza</option>
                  <option value="pending">Programmato</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-4">
                Pubblica
              </Button>
            </Form>
          </Col>
        )}
        {success && (
          <Alert variant="success">
            <Alert.Heading>Pagina creata con successo!</Alert.Heading>
          </Alert>
        )}
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Errore nella creazione della pagina, riprova!</Alert.Heading>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default CreateNewPage;
