import { Button, Col, Container, Row } from "react-bootstrap";
import { baseUrl } from "../constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SinglePage from "./SinglePage";

const Page = () => {
  const [pages, setPages] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const generatePaginationArray = () => {
    let paginationArr = [];
    for (let i = 1; i <= lastPage; i++) {
      paginationArr.push({
        numberPage: i,
        active: currentPage === i,
      });
    }
    return paginationArr;
  };

  const changePage = page => {
    setCurrentPage(page);
  };

  const getPage = () => {
    fetch(`${baseUrl}/pages?page=${currentPage}&_embed=1`)
      .then(response => {
        if (response.ok) {
          setLastPage(parseInt(response.headers.get("X-WP-TotalPages")));
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setPages(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Container>
      <h1 className="text-center my-4">Pages</h1>
      <Button type="button" variant="success" className="my-4" onClick={() => navigate("/newpage")}>
        Crea Nuova Pagina
      </Button>
      <Row>
        {pages.map(page => {
          return (
            <Col className="mb-3 text-center" xs={6} key={page.id}>
              <div>
                <SinglePage page={page} />
              </div>
            </Col>
          );
        })}
      </Row>
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <span
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
            >
              Previous
            </span>
          </li>
          {generatePaginationArray().map(page => {
            return (
              <li key={page.numberPage} className={`page-item ${page.active ? "active" : ""}`}>
                <span className="page-link" style={{ cursor: "pointer" }} onClick={() => changePage(page.numberPage)}>
                  {page.numberPage}
                </span>
              </li>
            );
          })}
          <li className="page-item">
            <span
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Page;
