import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleCard = props => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.post.title.rendered}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.post.author}</Card.Subtitle>
        <div dangerouslySetInnerHTML={{ __html: props.post.content.rendered.substring(0, 30) + "..." }}></div>
        <p>
          <span className="fw-semibold">status: </span>
          {props.post.status}
        </p>
        <p>
          <span className="fw-semibold">published: </span>
          {props.post.date.substring(0, 10)}
        </p>
        <p>
          <span className="fw-semibold">modified: </span>
          {props.post.modified.substring(0, 10)}
        </p>
        <p>
          <span className="fw-semibold">category: </span>
          {props.post.categories[0]}
        </p>
        {props.post.tags.length !== 0 && (
          <p>
            <span className="fw-semibold">tags: </span>
            {props.post.tags[0]}
          </p>
        )}

        <Card.Link href={props.post.link} target="_blanck">
          Vai al sito
        </Card.Link>
        <Link to={`post/${props.post.id}`}>
          <Button type="button" className="mt-3">
            Mostra Dettagli
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SingleCard;
