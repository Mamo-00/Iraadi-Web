import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactComponent as Appliance } from "../assets/categoryIcons/appliances.svg";
import { ReactComponent as Clothes } from "../assets/categoryIcons/clothes.svg";
import { ReactComponent as Car } from "../assets/categoryIcons/car.svg";
import { ReactComponent as Plants } from "../assets/categoryIcons/plants.svg";
import { ReactComponent as Furniture } from "../assets/categoryIcons/furniture.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../styles.css";

const Category = styled(Link)`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  margin-top: 5px;
  color: #000;
  text-decoration: none;
  font-weight: 700;
`;

const Container = styled.div`
  max-width: 1010px;
`;

const Fridge = styled(Appliance)`
  width: 100px;
  height: 100px;
`;
const Hoodie = styled(Clothes)`
  width: 100px;
  height: 100px;
`;
const Ferrari = styled(Car)`
  width: 100px;
  height: 100px;
`;
const Plant = styled(Plants)`
  width: 100px;
  height: 100px;
`;
const Sofa = styled(Furniture)`
  width: 100px;
  height: 100px;
`;

const Home = () => {

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = (e) => {
    e.preventDefault();
    setBasicModal(!basicModal)
  };

  return (
    <div>
      <header>
        {" "}
        <Navbar toggleShow={toggleShow}/>{" "}
      </header>
      <Login basicModal={basicModal} setBasicModal={setBasicModal} toggleShow={toggleShow}/>
      <Container className="row mx-auto justify-content-center">

        <Category to="/elektronikk-og-hvitevarer" className="col-6 col-sm-3">
          <div className="d-flex justify-content-center">
            <Fridge />
          </div>
        </Category>

        <Category to="/kjoretoy" className="col-6 col-sm-3">
          <div className="d-flex justify-content-center">
            <Ferrari />
          </div>
        </Category>

        <Category
          to="/klaer-og-tilbehor"
          className="col-3"
          title="klær og tilbehør"
        >
          
            <Hoodie />
            <Label className="">Clothes</Label>
        </Category>

        <Category to="/planter" className="col-6 col-sm-3">
          <div className="d-flex justify-content-center">
            <Plant />
          </div>
        </Category>

        <Category to="/mobler" className="col-6 col-sm-3">
          <div className="d-flex justify-content-center">
            <Sofa />
          </div>
        </Category>

        <Category to="/link1" className="col-6 col-sm-3">
          <div className="d-flex justify-content-center">
            <Fridge />
          </div>
        </Category>
        
      </Container>
    </div>
  );
};

export default Home;
