import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { authorizationString, baseUrl } from "../constant";

const CategoryDetails = () => {
  const params = useParams();
  const id = params["id"];
  const [category, setCategory] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
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

  const deleteCategory = () => {
    fetch(`${baseUrl}/categories/${id}?force=true`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authorizationString}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setDeleteStatus(false);
          setTimeout(() => {
            navigate("/categories");
          }, 1000);
          throw new Error("Errore nella cancellazione del post");
        }
      })
      .then(data => {
        console.log(data);
        setDeleteStatus(true);
        setTimeout(() => {
          navigate("/categories");
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="text-center">
      <Row>
        {category && deleteStatus === null && (
          <Card>
            <Card.Body>
              <Card.Title>{category.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <span className="fw-semibold">ID: </span>
                {category.id}
              </Card.Subtitle>
              <p>
                <span className="fw-semibold">description: </span>
                {category.description}
              </p>

              <Card.Link href={category.link} target="_blanck" className="d-block">
                Vai al sito
              </Card.Link>
              <Button
                type="button"
                variant="warning"
                className="mt-3"
                onClick={() => navigate(`/modifiedcategory/${id}`)}
              >
                Modifica Categoria
              </Button>
              <Button type="button" variant="danger" className="mt-3 ms-3" onClick={() => deleteCategory()}>
                Elimina Categoria
              </Button>
            </Card.Body>
          </Card>
        )}
        {deleteStatus === true && (
          <Alert variant="success">
            <Alert.Heading>Categoria eliminata con successo!</Alert.Heading>
          </Alert>
        )}
        {deleteStatus === false && (
          <Alert variant="danger">
            <Alert.Heading>Errore nella cancellazione della categoria, riprova!</Alert.Heading>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default CategoryDetails;
