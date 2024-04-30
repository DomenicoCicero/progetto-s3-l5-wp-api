import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { authorizationString, baseUrl } from "../constant";
import { useNavigate, useParams } from "react-router-dom";

const ModifiedPage = () => {
  const params = useParams();
  const id = params["id"];
  const [page, setPage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getPage = () => {
    fetch(`${baseUrl}/pages/${id}?_embed=1`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setPage(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page) {
      setFormData(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const initialState = {
    title: page ? page.title.rendered : "",
    content: page ? page.content.rendered : "",
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

  const modifiedPage = () => {
    fetch(`${baseUrl}/pages/${id}`, {
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
    modifiedPage();
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
              <Form.Group controlId="status">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="publish">Pubblicato</option>
                  <option value="draft">Bozza</option>
                  <option value="pending">Programmato</option>
                </Form.Control>
              </Form.Group>
              <Button variant="warning" type="submit" className="mt-4">
                Modifica
              </Button>
            </Form>
          </Col>
        )}
        {success && (
          <Alert variant="success">
            <Alert.Heading>Pagina modificata con successo!</Alert.Heading>
          </Alert>
        )}
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Errore nella modifica della pagina, riprova!</Alert.Heading>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default ModifiedPage;
