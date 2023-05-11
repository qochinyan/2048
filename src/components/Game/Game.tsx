import { useEffect, useState } from "react";
import Board from "../../models/BOard";
import Tile from "../../models/Tile";
import "./Game.scss";

const Game = ({ boardNum }) => {
  const [tiles, setTiles] = useState<Tile[][]>([]);
  const board = new Board(boardNum);
  function updateTiles(tiles: any[]) {
    setTiles(tiles);
  }
  useEffect(() => {
    board.init([tiles, updateTiles]);
    board.addFirstRandom();
    window.addEventListener("keydown", (evt) => {
      switch (evt.code) {
        case "ArrowLeft":
          board.moveTilesToLeft();
          break;
        case "ArrowUp":
          board.moveTilesToTop();
          break;
        case "ArrowRight":
          board.moveTilesToRight();
          break;
        case "ArrowDown":
          board.moveTilesToBottom();
          break;
      }
    });
  }, []);

  return (
    <div className="game-container">
      {tiles.map((RowTile, x) => {
        return RowTile.map((tile, y) => (
          <div
            className="tile-block"
            style={{
              width: `calc((100% - ${RowTile.length - 1}*5px)/${
                RowTile.length
              })`,
              height: `calc((100% - ${RowTile.length - 1}*5px)/${
                RowTile.length
              })`,
              backgroundColor:
                tile.value === 2
                  ? "#ffdd87"
                  : tile.value === 4
                  ? "#ffc757"
                  : tile.value > 4
                  ? "#ff7e21"
                  : "",
            }}
            key={`${x}-${y}`}
          >
            <span style={{ fontSize: `calc(100px - ${RowTile.length}*10px)` }}>
              {tile.value || ""}
            </span>
          </div>
        ));
      })}
    </div>
  );
};

export default Game;
