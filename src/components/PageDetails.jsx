import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { authorizationString, baseUrl } from "../constant";

const PageDetails = () => {
  const params = useParams();
  const id = params["id"];
  const [page, setPage] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
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

  const deletePost = () => {
    fetch(`${baseUrl}/pages/${id}`, {
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
            navigate("/page");
          }, 1000);
          throw new Error("Errore nella cancellazione del post");
        }
      })
      .then(data => {
        console.log(data);
        setDeleteStatus(true);
        setTimeout(() => {
          navigate("/page");
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="text-center">
      <Row>
        {page && deleteStatus === null && (
          <Card>
            <Card.Body>
              <Card.Title>{page.title.rendered}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{page._embedded.author[0].name}</Card.Subtitle>
              <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
              <p>
                <span className="fw-semibold">status: </span>
                {page.status}
              </p>
              <p>
                <span className="fw-semibold">published: </span>
                {page.date.substring(0, 10)}
              </p>
              <p>
                <span className="fw-semibold">modified: </span>
                {page.modified.substring(0, 10)}
              </p>

              <Card.Link href={page.link} target="_blanck" className="d-block">
                Vai al sito
              </Card.Link>
              <Button type="button" variant="warning" className="mt-3" onClick={() => navigate(`/modifiedpage/${id}`)}>
                Modifica Pagina
              </Button>
              <Button type="button" variant="danger" className="mt-3 ms-3" onClick={() => deletePost()}>
                Elimina Pagina
              </Button>
            </Card.Body>
          </Card>
        )}
        {deleteStatus === true && (
          <Alert variant="success">
            <Alert.Heading>Pagina eliminata con successo!</Alert.Heading>
          </Alert>
        )}
        {deleteStatus === false && (
          <Alert variant="danger">
            <Alert.Heading>Errore nella cancellazione della pagina, riprova!</Alert.Heading>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default PageDetails;
