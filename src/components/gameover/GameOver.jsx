import "./GameOver.css";
import HomeIcon from "../../images/ic_home.svg";
import ReplayIcon from "../../images/ic_replay.svg";
import { useNavigate } from "react-router-dom";

const GameOver = ({
  pokemonImg,
  highScore,
  score,
  pokemonName,
  restartGame,
}) => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <div className="game__over_container">
      <div className="game__over_dialog">
        <img
          src={pokemonImg}
          alt="pokemon defeated"
          className="pokemon_defeated_img"
        />
        <div className="game__over_details">
          <h2 className="pokemon_defeated_name">{pokemonName}</h2>
          <h4 className="game_over_high_score">High Score - {highScore}</h4>
          <h1 className="game_over_score">Score - {score}</h1>
        </div>
        <div className="game__over_replay" onClick={restartGame}>
          <img src={ReplayIcon} alt="Replay Game" />
        </div>
        <div className="game_over_home" onClick={goToHome}>
          <img src={HomeIcon} alt="Go to Home" />
        </div>
      </div>
    </div>
  );
};

export default GameOver;
