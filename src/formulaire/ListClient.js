import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./formulaire.css";
import Axios from "axios";
import NavigationBar from "../shared/NavigationBar";

class ListClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      currentPage: 1,
      numberPerPage: 5
    };
  }

  path = window.location.origin;

  componentWillMount() {
    if((sessionStorage.getItem('username') === null)) window.location.reload();
  }
  componentDidMount() {
    
    this.getAllClients();

  }

  changePage = (event) => {
    let clientsLength = this.state.clients.length;
    if (
      (event.target.value > 0) &
      (event.target.value <
        Math.ceil(clientsLength / this.state.numberPerPage) + 1)
    ) {
      this.setState({
        currentPage: parseInt(event.target.value),
      });
    }
  };

  firstPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: 1,
      });
  };

  prevPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
  };

  nextPage = () => {
    let clientsLength = this.state.clients.length;
    if (
      this.state.currentPage <
      Math.ceil(clientsLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
  };

  lastPage = () => {
    let clientsLength = this.state.clients
      .length;
    if (
      this.state.currentPage <
      Math.ceil(clientsLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: Math.ceil(
          clientsLength / this.state.numberPerPage
        ),
      });
  };

  getAllClients = () => {
    let authString = sessionStorage.getItem('basicauth');
    Axios.get("http://localhost:8082/clients",
    {headers : {authorization : authString}})
    .then((response) => response.data)
    .then((data) => {
      this.setState({
        clients : data,
        })
      });
  };

  

  render() {
    
    const { currentPage, numberPerPage, clients } = this.state;
    const lastIndex = currentPage * numberPerPage;
    const firstIndex = lastIndex - numberPerPage;
    const currentList = clients.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(clients.length / numberPerPage);

    return (
      <div style={{backgroundColor:"#707080"}}>
        <NavigationBar />
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>

          <br></br>
        <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
                        <Link
                          to={{
                            pathname: "form",
                            state: { fromDashboard: true },
                          }}
                          className="btn btn-info"
                          
                          
                        >
                          <img
                            src={this.path+"/images/add-white.png"}
                            width="20"
                            style={{ marginRight: "10px" }}
                            alt="Add"
                          />
                           Ajouter un compte
                        </Link>
          </ButtonGroup>
        <br></br>
        <br></br>

          <Card className="border border-dark bg-dark text-white">
        <Card.Header>Liste des clients</Card.Header>
        <Card.Body>
          
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Compte</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr align="center">
                  <td colSpan="5">Aucun client existe.</td>
                </tr>
              ) : (
                currentList.map((client) => (
                  <tr key={client.id}>
                    <td>{client.nom}</td>
                    <td>{client.prenom}</td>
                    <td>{client.email}</td>
                    <td>{client.telephone}</td>
                    <td>{client.compte.type}</td>

                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div style={{ float: "left" }}>
            Page {currentPage} de {totalPages}
          </div>

          <div style={{ float: "right" }}>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.firstPage}
                >
                  <img
                    src={this.path+"/images/first.png"}
                    width="20"
                    alt="first"
                  />
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.prevPage}
                >
                  <img
                    src={this.path+"/images/prev.png"}
                    width="20"
                    alt="prev"
                  />
                </Button>
              </InputGroup.Prepend>

              <FormControl
                className={" bg-dark page-num"}
                name="currentPage"
                value={currentPage}
                onChange={this.changePage}
                type="text"
                pattern="[0-9]+"
              />

              <InputGroup.Append>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.nextPage}
                >
                  <img
                    src={this.path+"/images/next.png"}
                    width="20"
                    alt="next"
                  />
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.lastPage}
                >
                  <img
                    src={this.path+"/images/last.png"}
                    width="20"
                    alt="last"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Card.Footer>
      </Card>
          </Col>
          </Row>
          </Container>
          </div>
      
    );
  }
}

export default ListClient;
