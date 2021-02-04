import React, { Component } from "react";
import { Toast } from "react-bootstrap";

export default class ToastComponent extends Component {
  render() {
    const toastCss = {
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: "1",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.2) ",
    };
    return (
      <div style={toastCss}>
        <Toast
          className={`border text-white ${
            this.props.type === "success"
              ? "border-success bg-success"
              : "border-danger bg-danger"
          }`}
          show={this.props.show}
        >
          <Toast.Header
            className={`text-white  ${
              this.props.type === "success"
                ? "border-success bg-success"
                :  "border-danger bg-danger"
                
            }`}
            closeButton={false}
          >
            <strong className="mr-auto">Succès</strong>
          </Toast.Header>
          <Toast.Body>
            {this.props.type === "success"
              ? "Compte ajouté avec succès."
              :  "Compte modifiée avec succès."}
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}
