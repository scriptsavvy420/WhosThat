import React, { useEffect, useState } from "react";

import "./Home.css";

import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import PikachuImg from "../images/pikachu.png";

const Home = () => {
  const [randomPokemonImg, setrandomPokemonImg] = useState(null);
  useEffect(() => {
    // you can add any pokemon to this random pokemon list
    const randomPokemon = [
      PikachuImg,
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/female/445.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/727.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/717.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/791.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/250.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/150.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/493.png",
    ];

    setrandomPokemonImg(
      randomPokemon[Math.floor(Math.random() * randomPokemon.length)]
    );
  }, []);
  return (
    <>
      <div className="navbar__container">
        <div className="blurred_shadow"></div>
        <div className="navbar">
          <h1 className="logo">Who's That</h1>
          <div className="button__holders">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Vishal-beep136/WhosThat"
            >
              <Button type="unfill" text="Github" />
            </a>
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
          <img
            src={randomPokemonImg}
            alt="pokemon"
            className="right__side_img"
          />
          <div className="right__side_blurred-shadow"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
