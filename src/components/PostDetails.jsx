import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../constant";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const PostDetails = () => {
  const params = useParams();
  const id = params["id"];
  const [post, setPost] = useState(null);

  const getPost = () => {
    fetch(`${baseUrl}/posts/${id}`)
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

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container className="text-center">
      <Row>
        {/* <Col xs={11}> */}
        {post && (
          <Card>
            <Card.Body>
              <Card.Title>{post.title.rendered}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{post.author}</Card.Subtitle>
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
              <p>
                <span className="fw-semibold">category: </span>
                {post.categories[0]}
              </p>
              {post.tags.length !== 0 && (
                <p>
                  <span className="fw-semibold">tags: </span>
                  {post.tags[0]}
                </p>
              )}

              <Card.Link href={post.link} target="_blanck" className="d-block">
                Vai al sito
              </Card.Link>
              <Link to={`/`}>
                <Button type="button" className="mt-3">
                  Torna in Homepage
                </Button>
              </Link>
            </Card.Body>
          </Card>
        )}
        {/* </Col> */}
      </Row>
    </Container>
  );
};

export default PostDetails;
