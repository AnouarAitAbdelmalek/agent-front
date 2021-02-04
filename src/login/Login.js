import Axios from "axios";
import React, { Component } from "react";
import { Form, Button, Jumbotron, Col, Container, Row } from "react-bootstrap";
import NavigationBar from "../shared/NavigationBar";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      enabled: false
    };
  }

  login = (event) => {
    event.preventDefault();

    const utilisateur = {
      username: this.state.username,
      password: this.state.password,
    }; 

    let authString = 'Basic ' + btoa(utilisateur.username + ":" + utilisateur.password);
    Axios.get("http://localhost:8082/agent/"+ utilisateur.username, {
      headers: {authorization : authString}
    })
      .then(response => response.data)
      .then(
        (data) => {
          console.log(data);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('nom', data.nom);
          sessionStorage.setItem('prenom', data.prenom);
          sessionStorage.setItem('provisoire', data.provisoire);
          sessionStorage.setItem('basicauth', authString);
          sessionStorage.setItem('id', data.id);

          window.location.reload();
          

        },
        (error) => {
          this.setState({
            username: "",
            password: "",
            enabled: true
          });
        }
      );
  };

  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <NavigationBar />
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>
      <Jumbotron className="bg-dark text-white">
        <Form onSubmit={this.login}>
          <Form.Group>
            <Form.Label>Nom d'utilisateur (username)</Form.Label>
            <Form.Control
            required
              type="text"
              value={this.state.username}
              onChange={this.formChange}
              placeholder="Saisissez votre username..."
              name="username"
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
            required
              type="password"
              value={this.state.password}
              onChange={this.formChange}
              placeholder="Saisissez votre mot de passe..."
              name="password"
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Connexion
          </Button>
        </Form>
        <p style={{color: 'red', textAlign: 'center'}}> {this.state.enabled === true ? "Données erronées !" : ""} </p>
      </Jumbotron>
      </Col>
      </Row>
      </Container>
      </div>
    );
  }
}
