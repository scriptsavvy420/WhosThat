import React, { useEffect, useState } from "react";
import "./Game.css";
import WTPLogoImg from "../images/whosthatpokemon.png";
import PikachuTestImg from "../images/pikachu.png";
import Timer from "../components/timer/Timer";
import { fetchPokemonData, fetchPokemonOption } from "../utils/fetchdata";
import GameOver from "../components/gameover/GameOver";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const totalPokemons = 905;
  const correctAnswerPoint = 20;

  const highScoreStored = localStorage.getItem("high_score") || 0;
  const [highScore, sethighScore] = useState(highScoreStored);

  const [loadNewPokemon, setLoadNewPokemon] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({});

  const [IsGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [answerOptions, setAnswerOptions] = useState([]);
  const [isAllOptionLocked, setIsAllOptionLocked] = useState(false);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * (totalPokemons + 1));
  };

  const isSelectedOptCorrect = (selectedOpt, currentOpt) => {
    return selectedOpt.toLowerCase() === currentOpt.toLowerCase();
  };

  const showPokemon = (show = true) => {
    const imgPokemon = document.querySelector("#pokemon_shadow_img");
    if (show) {
      imgPokemon.classList.add("show");
    } else {
      if (imgPokemon) imgPokemon.classList.remove("show");
    }
  };

  const resetOptionsAndLoadNewQuestion = () => {
    setTimeout(() => {
      showPokemon(false);
      setIsAllOptionLocked(false);
      setLoadNewPokemon((prev) => !prev);
    }, 3000);
  };

  const handleOptionClick = (e) => {
    if (isAllOptionLocked) return;
    if (isSelectedOptCorrect(e.target.textContent, currentPokemon?.name)) {
      showPokemon();
      setScore((prevScore) => (prevScore += correctAnswerPoint));
      e?.target.classList?.add("correct_opt");
      setIsAllOptionLocked(true);
      resetOptionsAndLoadNewQuestion();
    } else {
      setGameOver(true);
      if (score > highScore) {
        sethighScore(score);
        localStorage.setItem("high_score", score);
      }
    }
  };

  useEffect(() => {
    fetchPokemonData(getRandomPokemonId()).then((pokemonData) => {
      if (pokemonData.sprites.other.home.front_default == null) {
        setLoadNewPokemon((prev) => !prev);
        return;
      }

      fetchPokemonOption(getRandomPokemonId()).then((pokemonOptions) => {
        const options = getOptionsAndSuffle(
          pokemonOptions?.results,
          pokemonData?.name
        );
        setAnswerOptions(options);
        setCurrentPokemon(pokemonData);
      });
    });
  }, [loadNewPokemon]);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setIsAllOptionLocked(false);
    setLoadNewPokemon(true);
  };

  return (
    <>
      <div className="navbar__high-score">
        <div className="blurred_shadow"></div>
        <div className="navbar_game">
          <h1 className="logo">Who's That</h1>
          <h2 className="high__score">High Score - {highScore}</h2>
        </div>
      </div>
      {IsGameOver ? (
        <GameOver
          pokemonImg={currentPokemon?.sprites?.other?.home?.front_default}
          highScore={highScore}
          score={score}
          pokemonName={currentPokemon?.name}
          restartGame={restartGame}
        />
      ) : (
        <div className="game__container">
          <div className="whos__that_pokemon_card">
            <img
              src={WTPLogoImg}
              alt="Who's that pokemon!"
              className="wtp__logo"
            />
            <img
              src={currentPokemon?.sprites?.other?.home?.front_default}
              loading="lazy"
              alt={currentPokemon.name}
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
              <div className="yellow__box">
                Time -{" "}
                <Timer
                  isAllOptionLocked={isAllOptionLocked}
                  questionChanged={loadNewPokemon}
                  setGameOver={setGameOver}
                />
              </div>
              <div
                className="yellow__box"
                style={{ cursor: "pointer" }}
                onClick={goToHome}
              >
                Home
              </div>
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
              <img
                src={PikachuTestImg}
                alt="Pikachu"
                className="sm__right_img"
              />
              <div className="sm_right__side_blurred-shadow"></div>
            </div>
          </div>
        </div>
      )}
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
  while (currentIndex !== 0) {
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
