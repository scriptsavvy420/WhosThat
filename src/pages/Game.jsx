import React, { useEffect, useState } from "react";
import "./Game.css";
import WTPLogoImg from "../images/whosthatpokemon.png";
import PikachuTestImg from "../images/pikachu.png";

const Game = () => {
  const totalPokemons = 905;
  const correctAnswerPoint = 20;

  const [loadNewPokemon, setLoadNewPokemon] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({});

  const [score, setScore] = useState(0);

  const [answerOptions, setAnswerOptions] = useState([]);
  const [isAllOptionLocked, setIsAllOptionLocked] = useState(false);

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * (totalPokemons + 1));
  };

  useEffect(() => {
    const randomPokemonFetchUrl = `https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`;
    fetch(randomPokemonFetchUrl)
      .then((response) => response.json())
      .then((pokemonData) => {
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

  const isSelectedOptCorrect = (selectedOpt, currentOpt) => {
    return selectedOpt.toLowerCase() === currentOpt.toLowerCase();
  };

  const showPokemon = (show = true) => {
    const wtpImg = document.querySelector(".wtp__logo");
    const imgPokemon = document.querySelector("#pokemon_shadow_img");
    if (show) {
      imgPokemon.classList.add("show");
      wtpImg.classList.add("hide");
    } else {
      imgPokemon.classList.remove("show");
      wtpImg.classList.remove("hide");
    }
  };

  const resetOptionsAndLoadNewQuestion = () => {
    setIsAllOptionLocked(false);
    setTimeout(() => {
      showPokemon(false);
      setLoadNewPokemon((prev) => !prev);
    }, 3000);
  };

  const showCorrectAnswer = () => {
    const options = document.getElementsByClassName("option_box__unfill");
    console.log(options);
    for (let index in options) {
      if (
        isSelectedOptCorrect(options[index].textContent, currentPokemon?.name)
      ) {
        options[index].classList?.add("correct_opt");
        break;
      }
    }
  };

  const handleOptionClick = (e) => {
    if (isAllOptionLocked) return;
    setIsAllOptionLocked(true);
    showPokemon();
    if (isSelectedOptCorrect(e.target.textContent, currentPokemon?.name)) {
      setScore((prevScore) => (prevScore += correctAnswerPoint));
      e?.target.classList?.add("correct_opt");
      resetOptionsAndLoadNewQuestion();
    } else {
      e?.target.classList?.add("wrong_opt");
      showCorrectAnswer();
    }
  };

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
            id="pokemon_shadow_img"
            className="pokemon__img"
          />
        </div>
        <div className="whos_pokemon_details">
          <div className="score__time_container">
            <div className="yellow__box">Score - {score}</div>
            <div className="yellow__box">Time - 30</div>
            <div className="yellow__box">Home</div>
            <div className="yellow__box">Restart</div>
          </div>

          <div className="option__container">
            {answerOptions?.map((pokemon, index) => (
              <div
                className="option_box__unfill"
                key={index + pokemon.name}
                onClick={handleOptionClick}
              >
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
