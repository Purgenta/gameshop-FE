import { Game } from "@/types/game";
import GameItem from "./GameItem";
import style from "./GamesList.module.css";
type GamesListProps = {
  games: Game[];
};
const GamesList = ({ games }: GamesListProps) => {
  const gamesDisplay = games.map((game) => {
    const { title, id, price, gameImages } = game;
    return (
      <li key={id} className={style["item"]}>
        <GameItem id={id} gameImages={gameImages} price={price} title={title} />
      </li>
    );
  });
  return (
    <div>
      <ul className={style["games-list"]}>{gamesDisplay}</ul>
    </div>
  );
};

export default GamesList;
