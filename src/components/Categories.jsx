import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { baseUrl } from "../constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
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

  const getCategories = () => {
    fetch(`${baseUrl}/categories?page=${currentPage}&_embed=1`)
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
        setCategories(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Container>
      <h1 className="text-center my-4">Categorie</h1>
      <Button type="button" variant="success" className="my-4" onClick={() => navigate("/newcategory")}>
        Crea Nuova Categoria
      </Button>
      <Row>
        <Col xs={10} className="offset-1">
          <ListGroup>
            {categories.map(category => {
              return (
                <ListGroup.Item key={category.id}>
                  <div className="d-flex justify-content-between">
                    {category.name}
                    <div>
                      <Button
                        type="button"
                        className="text-end"
                        onClick={() => navigate(`categorydetails/${category.id}`)}
                      >
                        Mostra Dettagli
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
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

export default Categories;
