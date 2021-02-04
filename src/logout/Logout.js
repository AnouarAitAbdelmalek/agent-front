import React, { Component } from "react";
import { Button, Col, Container, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../shared/NavigationBar";

export default class Logout extends Component {

  

  componentWillMount() {
    sessionStorage.removeItem('basicauth');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('nom');
    sessionStorage.removeItem('prenom');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('provisoire');
  }

  componentDidMount() {
    
  }
  render() {
    
    return (
      <div>
        <NavigationBar />
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>
      <Jumbotron className="bg-dark text-white">
        <h2>Merci d’être passé(e) !</h2>
        <p></p>
        <h6>Nous espérons vous revoir bientôt.</h6>

        <Link to={"/login"}>
          <Button variant="primary">Connexion</Button>
        </Link>
      </Jumbotron>
      </Col>
      </Row>
      </Container>
      </div>
    );
    
  }
}
