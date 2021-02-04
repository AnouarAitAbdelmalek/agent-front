import Axios from "axios";
import React, { Component } from "react";
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import NavigationBar from "../shared/NavigationBar";
import ToastComponent from "../shared/ToastComponent";



class formulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.client = this.initialState;
    this.state.show = false;
    this.state.type = "";
  }

  initialState = {
    id: "",
    username: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    compte: {
      type: ""
    }
  };

  componentWillMount() {
    
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ client: this.initialState });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
  
  }

  

  submit = (event) => {
    event.preventDefault();
   
        

    const client = {
    nom: this.state.client.nom,
    prenom: this.state.client.prenom,
    email: this.state.client.email,
    telephone: this.state.client.telephone,
    compte: this.state.client.compte
    };

    let authString = sessionStorage.getItem('basicauth');

    
    Axios.post(
      "http://localhost:8082/client",
      client,
      {headers : {authorization : authString}}
    ).then((response) => response.data)
    .then(data => {
      setTimeout(() => {
        if (data != null) {
          this.setState({
            show: true,
            type: "success",
          });
          setTimeout(() => {
            this.setState({ show: false });
          }, 3000);
        } else {
          this.setState({
            show: false,
            type: "",
          });
        }
      }, 200);
    })
    ;

    this.setState({ client: this.initialState });

  
  };

  

  clientChange = (event) => {
    
     if(event.target.name === "type")
     {
      this.setState({ ...this.state,
        client: {
          ...this.state.client,
          compte : {
            ...this.state.client.compte,
            [event.target.name]: event.target.value
          }
        }
      });
     }
     else {
      this.setState({ ...this.state,
        client: {
          ...this.state.client,
          [event.target.name]: event.target.value
        }
      });
     }
       
     
  };

  render() {
    const { show, type } = this.state;


    return (
      
      <div style={{backgroundColor:"#707080"}}>
        <NavigationBar/>
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>
        <div style={{ dispaly: show ? "block" : "none" }}>
          <ToastComponent show={show} type={type} />
        </div>

        <Card className="border border-dark text-white bg-dark">
          <Card.Header>
            {"Ouverture d'un compte de paiement"}
          </Card.Header>
          <Form
            onSubmit={this.submit}
            id="clientFormId"
          >
            <Card.Body>
              <Form.Group controlId="formGridNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le nom..."
                  value={this.state.client.nom}
                  onChange={this.clientChange}
                  required
                  className="bg-dark text-white"
                  name="nom"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridPrenom">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le prénom..."
                  value={this.state.client.prenom}
                  onChange={this.clientChange}
                  required
                  className="bg-dark text-white"
                  name="prenom"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez l'email..."
                  value={this.state.client.email}
                  onChange={this.clientChange}
                  required
                  className="bg-dark text-white"
                  name="email"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridTelephone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le numéro de téléphone..."
                  value={this.state.client.telephone}
                  onChange={this.clientChange}
                  required
                  className="bg-dark text-white"
                  name="telephone"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridCompte">
                <Form.Label>Compte</Form.Label>
                <Form.Control
                  as="select"
                  autoComplete="off"
                  value={this.state.client.compte.type}
                  onChange={this.clientChange}
                  required
                  className="bg-dark text-white"
                  name="type"
                >
                  <option key="" value="">--Choisissez un produit--</option>
                  <option key="Hssab 1 - Plafond: 200 DH" value="Hssab 1 - Plafond: 200 DH">Hssab 1 - Plafond: 200 DH</option>
                  <option key="Hssab 2 - Plafond: 5000 DH" value="Hssab 2 - Plafond: 5000 DH">Hssab 1 - Plafond: 500 DH</option>
                  <option key="Hssab 3 - Plafond: 20000 DH" value="Hssab 3 - Plafond: 20000 DH">Hssab 1 - Plafond: 20000 DH</option>
                </Form.Control>
              </Form.Group>

            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
                <Button variant="success" type="submit">
                  Enregistrer
                </Button>
            </Card.Footer>
          </Form>
        </Card>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default formulaire;