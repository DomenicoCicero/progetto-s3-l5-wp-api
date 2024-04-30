import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { authorizationString, baseUrl } from "../constant";
import { useNavigate, useParams } from "react-router-dom";

const ModifiedCategory = () => {
  const params = useParams();
  const id = params["id"];
  const [category, setCategory] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getCategory = () => {
    fetch(`${baseUrl}/categories/${id}?_embed=1`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setCategory(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (category) {
      setFormData(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const initialState = {
    name: category ? category.name : "",
    description: category ? category.description : "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const modifiedCategory = () => {
    fetch(`${baseUrl}/categories/${id}`, {
      method: "PUT",
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
    modifiedCategory();
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

              <Button variant="warning" type="submit" className="mt-4">
                Modifica
              </Button>
            </Form>
          </Col>
        )}
        {success && (
          <Alert variant="success">
            <Alert.Heading>Categoria modificata con successo!</Alert.Heading>
          </Alert>
        )}
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Errore nella modifica della categoria, riprova!</Alert.Heading>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default ModifiedCategory;
