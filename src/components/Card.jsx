import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";

function Card( { img, title, price ,priceBefore, priceAfter, stock } ) {
  return (
        <MDBCol md="6" lg="4" className="mb-4 ">
          <MDBCard>
            <div className="d-flex justify-content-between p-3">
              <p className="lead mb-0">{title}</p>
            </div>
            <MDBCardImage
              src={img}
              position="top"
              alt="Gaming Laptop"
            />
            <MDBCardBody>
              <div className="d-flex justify-content-between">
                <p className="small">
                  <a href="#!" className="text-muted">
                    Clothes
                  </a>
                </p>
                <p className="small text-danger">
                  <s>{priceBefore}</s>
                </p>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">Shirt</h5>
                <h5 className="text-dark mb-0">{priceAfter}</h5>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <p className="text-muted mb-0">
                  Available: <span className="fw-bold">{stock}</span>
                </p>
                <div className="ms-auto text-warning">
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star-half-alt" />
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
  );
}

export default Card;