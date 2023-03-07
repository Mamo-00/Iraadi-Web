import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";
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

const Aside = styled.div`
  background-color: #f2f2f2;
  border: 3px solid #ddd;
  padding: 10px;
  height: 400px; /* adjust as needed */
  margin-top: 5rem;
`;

const Fridge = styled(Appliance)`
  width: 75px;
  height: 75px;
`;
const Hoodie = styled(Clothes)`
  width: 75px;
  height: 75px;
`;
const Ferrari = styled(Car)`
  width: 75px;
  height: 75px;
`;
const Plant = styled(Plants)`
  width: 75px;
  height: 75px;
`;
const Sofa = styled(Furniture)`
  width: 75px;
  height: 75px;
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
      <div className="row mt-2 justify-content-center">
        <Aside className="col-2 my-auto ms-2 p-2">
          
        </Aside>
        <Container className="row mx-2 justify-content-center col-6">

          <Category to="/elektronikk-og-hvitevarer" className="col-6 col-sm-2">
            <div className="d-flex justify-content-center">
              <Fridge />
            </div>
          </Category>

          <Category to="/kjoretoy" className="col-6 col-sm-2">
            <div className="d-flex justify-content-center">
              <Ferrari />
            </div>
          </Category>

          <Category
            to="/klaer-og-tilbehor"
            className="col-6 col-sm-2"
            title="klær og tilbehør"
          >
            
              <Hoodie />
              <Label className="">Clothes</Label>
          </Category>

          <Category to="/planter" className="col-6 col-sm-2">
            <div className="d-flex justify-content-center">
              <Plant />
            </div>
          </Category>

          <Category to="/mobler" className="col-6 col-sm-2">
            <div className="d-flex justify-content-center">
              <Sofa />
            </div>
          </Category>

        </Container>
        <Aside className="col-2 my-auto me-2 p-2">
          
        </Aside>
      </div>
      <div className="row justify-content-center mx-auto mt-2">
        <div className="col-10">
          <Recommendations />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
