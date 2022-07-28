import React, { useEffect, useState } from "react";
import "./Game.css";
import WTPLogoImg from "../images/whosthatpokemon.png";
import PikachuTestImg from "../images/pikachu.png";

const Game = () => {
  const totalPokemons = 905;

  const [loadNewPokemon, setLoadNewPokemon] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [answerOptions, setAnswerOptions] = useState([]);

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * (totalPokemons + 1));
  };

  useEffect(() => {
    const randomPokemonFetchUrl = `https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`;
    fetch(randomPokemonFetchUrl)
      .then((response) => response.json())
      .then((pokemonData) => {
        console.log(pokemonData);
        fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${getRandomPokemonId()}`
        )
          .then((resp) => resp.json())
          .then((data) => {
            const options = getOptionsAndSuffle(
              data?.results,
              pokemonData?.name
            );
            setAnswerOptions(options);
            setCurrentPokemon(pokemonData);
          });
      });
  }, [loadNewPokemon]);

  return (
    <>
      <div className="navbar__high-score">
        <div className="blurred_shadow"></div>
        <div className="navbar">
          <h1 className="logo">Who's That</h1>
          <h2 className="high__score">High Score - 0</h2>
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
            src={currentPokemon?.sprites?.other?.home?.front_default}
            alt="Pokemon Shadow!"
            onDragStart={(e) => {
              e.preventDefault();
            }}
            className="pokemon__img"
          />
        </div>
        <div className="whos_pokemon_details">
          <div className="score__time_container">
            <div className="yellow__box">Score - 20</div>
            <div className="yellow__box">Time - 30</div>
            <div className="yellow__box">Home</div>
            <div className="yellow__box">Restart</div>
          </div>

          <div className="option__container">
            {answerOptions?.map((pokemon, index) => (
              <div className="box__unfill" key={index + pokemon.name}>
                {pokemon?.name}
              </div>
            ))}
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

function getOptionsAndSuffle(results, currentPokemonName) {
  const options = [];
  options.push({ name: currentPokemonName, url: null });
  options.push(results[0]);
  options.push(results[3]);
  options.push(results[6]);
  return shuffle(options);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default Game;
