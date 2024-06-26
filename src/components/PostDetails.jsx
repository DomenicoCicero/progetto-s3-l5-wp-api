import { useNavigate, useParams } from "react-router-dom";
import { authorizationString, baseUrl } from "../constant";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Row } from "react-bootstrap";

const PostDetails = () => {
  const params = useParams();
  const id = params["id"];
  const [post, setPost] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const navigate = useNavigate();

  const getPost = () => {
    fetch(`${baseUrl}/posts/${id}?_embed=1`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setPost(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deletePost = () => {
    fetch(`${baseUrl}/posts/${id}`, {
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
            navigate("/");
          }, 1000);
          throw new Error("Errore nella cancellazione del post");
        }
      })
      .then(data => {
        console.log(data);
        setDeleteStatus(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="text-center">
      <Row>
        {post && deleteStatus === null && (
          <Card>
            <Card.Body>
              <Card.Title>{post.title.rendered}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{post._embedded.author[0].name}</Card.Subtitle>
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
              <p>
                <span className="fw-semibold">status: </span>
                {post.status}
              </p>
              <p>
                <span className="fw-semibold">published: </span>
                {post.date.substring(0, 10)}
              </p>
              <p>
                <span className="fw-semibold">modified: </span>
                {post.modified.substring(0, 10)}
              </p>
              {post.categories.length !== 0 && (
                <p>
                  <span className="fw-semibold">category: </span>
                  {post._embedded["wp:term"][0].map(category => {
                    return (
                      <span key={category.id} className="badge rounded-pill text-bg-primary">
                        {category.name}
                      </span>
                    );
                  })}
                </p>
              )}

              {post.tags.length !== 0 && (
                <p>
                  <span className="fw-semibold">tags: </span>
                  {post._embedded["wp:term"][1].map(tag => {
                    return (
                      <span key={tag.id} className="badge rounded-pill text-bg-primary">
                        {tag.name}
                      </span>
                    );
                  })}
                </p>
              )}

              <Card.Link href={post.link} target="_blanck" className="d-block">
                Vai al sito
              </Card.Link>
              <Button type="button" variant="warning" className="mt-3" onClick={() => navigate(`/modifiedpost/${id}`)}>
                Modifica Post
              </Button>
              <Button type="button" variant="danger" className="mt-3 ms-3" onClick={() => deletePost()}>
                Elimina Post
              </Button>
            </Card.Body>
          </Card>
        )}
        {deleteStatus === true && (
          <Alert variant="success">
            <Alert.Heading>Post eliminato con successo!</Alert.Heading>
          </Alert>
        )}
        {deleteStatus === false && (
          <Alert variant="danger">
            <Alert.Heading>Errore nella cancellazione del post, riprova!</Alert.Heading>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default PostDetails;
