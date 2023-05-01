import { useDebugValue, useDeferredValue, useEffect, useState } from "react";
import Board from "../../models/BOard";
import Tile from "../../models/Tile";
import "./Home.scss";
const board = new Board(16);

const Home = () => {
  const [tiles, setTiles] = useState<Tile[][]>([]);
  const [lastTiles, setLastTiles] = useState<Tile[][]>([]);

  useEffect(() => {
    board.init([tiles, updateTiles]);
    console.log(board.tiles);
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

  function updateTiles(tiles: any[]) {
    setTiles(tiles);
  }
  return (
    <div className="screen-container">
      <div className="game-container">
        {tiles.map((RowTile, x) => {
          return RowTile.map((tile, y) => (
            <div
              className="tile-block"
              style={{
                width: `calc(100% / ${RowTile.length} - (${
                  RowTile.length - 1
                }*3px )) `,
                height: `calc(100% / ${RowTile.length} - (${
                  RowTile.length - 1
                }*3px)`,
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
              <span>{tile.value || ""}</span>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default Home;
