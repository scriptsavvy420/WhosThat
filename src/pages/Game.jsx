import React from "react";
import "./Game.css";
import WTPLogoImg from "../images/whosthatpokemon.png";
import PikachuTestImg from "../images/pikachu.png";

const Game = () => {
  // Todo so some loading screen of WTPLogoImg

  return (
    <>
      <div className="navbar__high-score">
        <div className="blurred_shadow"></div>
        <div className="navbar">
          <h1 className="logo">Who's That</h1>
          <h2 className="high__score">High Score - 392</h2>
        </div>
      </div>

      <div className="game__container">
        <div className="whos__that_pokemon_card">
          <img
            src={WTPLogoImg}
            alt="Who's that pokemon!"
            className="wtp__logo"
          />
          <img
            src={PikachuTestImg}
            alt="Pokemon Shadow!"
            className="pokemon__img"
          />
        </div>
        <div className="whos_pokemon_details">
          <div className="score__time_container">
            <div className="yellow__box">Score - 0</div>
            <div className="yellow__box">Time - 30</div>
            <div className="yellow__box">Home</div>
            <div className="yellow__box">Restart</div>
          </div>

          <div className="option__container">
            <div className="box__unfill">Bulbasaur</div>
            <div className="box__unfill">Charizard</div>
            <div className="box__unfill">Blostoise</div>
            <div className="box__unfill">Genesect</div>
          </div>

          <div className="game__right-shadow">
            <img src={PikachuTestImg} alt="Pikachu" className="sm__right_img" />
            <div className="sm_right__side_blurred-shadow"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
