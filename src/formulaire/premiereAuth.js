import Axios from "axios";
import React, { Component } from "react";
import { Form, Button, Jumbotron, Col, Container, Row } from "react-bootstrap";
import NavigationBar from "../shared/NavigationBar";

export default class premiereAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmation:"",
      enabled: false
    };
  }

  login = (event) => {
    event.preventDefault();

    const verification = {
      password: this.state.password,
      confirmation: this.state.confirmation,
    }; 
    
    if(verification.password !== verification.confirmation)
    {
        this.setState({
            ...this.state,
            enabled: true
          });
    }
    else{
    
        console.log(verification.password);

    let authString = sessionStorage.getItem('basicauth');
    let obj = {
      password: verification.password
    }
    
    
    Axios.put("http://localhost:8082/agent/"+ sessionStorage.getItem('id'),
    obj, 
    {headers: {authorization : authString}
    })
      .then(response => response.data)
      .then(
        (data) => {
            
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('nom');
          sessionStorage.removeItem('prenom');
          sessionStorage.removeItem('basicauth');
          sessionStorage.removeItem('id');
          sessionStorage.removeItem('provisoire');

          window.location.reload();
          

        }
      );

    }
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
            <Form.Label>nouveau mot de passe</Form.Label>
            <Form.Control
            required
              type="text"
              value={this.state.password}
              onChange={this.formChange}
              placeholder="Saisissez votre mot de passe..."
              name="password"
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirmer mot de passe</Form.Label>
            <Form.Control
            required
              type="text"
              value={this.state.confirmation}
              onChange={this.formChange}
              placeholder="Saisissez votre mot de passe..."
              name="confirmation"
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Confirmer
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
