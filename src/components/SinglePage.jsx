import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SinglePage = props => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.page.title.rendered}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.page._embedded.author[0].name}</Card.Subtitle>
        <div dangerouslySetInnerHTML={{ __html: props.page.content.rendered.substring(0, 30) + "..." }}></div>
        <p>
          <span className="fw-semibold">status: </span>
          {props.page.status}
        </p>
        <p>
          <span className="fw-semibold">published: </span>
          {props.page.date.substring(0, 10)}
        </p>
        <p>
          <span className="fw-semibold">modified: </span>
          {props.page.modified.substring(0, 10)}
        </p>

        <Card.Link href={props.page.link} target="_blanck" className="d-block">
          Vai al sito
        </Card.Link>
        <Link to={`pagedetails/${props.page.id}`}>
          <Button type="button" className="mt-3">
            Mostra Dettagli
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SinglePage;
