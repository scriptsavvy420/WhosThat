import React from "react";

import "./Home.css";

import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import PikachuImg from "../images/pikachu.png";

const Home = () => {
  return (
    <>
      <div className="navbar__container">
        <div className="blurred_shadow"></div>
        <div className="navbar">
          <h1 className="logo">Who's That</h1>
          <div className="button__holders">
            <Button type="unfill" text="Github" />
            <Link to="/play">
              <Button type="fill" text="Start" />
            </Link>
          </div>
        </div>
      </div>

      <div className="home__container">
        <div className="home__container-left__side">
          <h1 className="left__side-heading">
            Who's that <span>Pokémon</span>
          </h1>

          <Link to="/play">
            <button className="play__btn">Play</button>
          </Link>

          <h1 className="left__side-play__now-outline">Play Now</h1>
        </div>

        <div className="home__container-right__side">
          <img src={PikachuImg} alt="Pikachu" className="right__side_img" />
          <div className="right__side_blurred-shadow"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
