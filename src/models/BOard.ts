import Tile from "./Tile";
import { useState } from "react";

export default class Board {
  private _setTiles: React.Dispatch<React.SetStateAction<Tile[][]>>;
  tiles: Tile[][];
  move: Boolean = true;

  constructor(readonly size: number = 16) {}

  randomTwoOrFour = () => {
    return Math.random() > 0.15 ? 2 : 4;
  };

  setTiles(tiles: Tile[][]) {
    this.tiles = tiles;
    this._setTiles(tiles);
  }

  setMove = (payload: boolean) => {
    this.move = payload;
  };

  findTileByIndex(index: number, from?: Tile[][]): Tile | undefined {
    for (let i of from) {
      for (let j of i) {
        if (index === j.index) return j;
      }
    }
  }
  afterMove(move: boolean, newTiles: Tile[][], add?: boolean) {
    this.setMove(move);
    this.setTiles(newTiles);
    if ((add || move) && !this.areTilesFull()) {
      this.asyncRandomAdd();
    }
  }
  // top
  moveTilesToTop = (newTiles2?: Tile[][], add?: boolean) => {
    let newTiles: Tile[][] = newTiles2 ?? [...this.tiles];
    let move = false;
    for (let i = 0; i < newTiles.length; i++) {
      let plus = 0;
      let isFinished = false;
      while (!isFinished) {
        isFinished = true;
        for (let j = 0; j < newTiles.length - 1; j++) {
          if (newTiles[j][i].value === undefined && newTiles[j + 1][i].value) {
            isFinished = false;
            newTiles[j][i].setValue(newTiles[j + 1][i].value);
            newTiles[j + 1][i].setValue(undefined);
            move = true;
          } else if (
            !plus &&
            !newTiles[j][i].isEmpty() &&
            newTiles[j][i].value === newTiles[j + 1][i].value
          ) {
            newTiles[j][i].setValue(newTiles[j][i].value * 2);
            newTiles[j + 1][i].setValue(undefined);
            plus++;
            isFinished = false;
            move = true;
            if (!newTiles2) {
              this.moveTilesToTop(newTiles, true);
              return;
            }
          }
        }
      }
    }
    this.afterMove(move, newTiles, add);
  };
  // bottom
  moveTilesToBottom = (newTiles2?: Tile[][], add?: boolean) => {
    let newTiles: Tile[][] = newTiles2 ?? [...this.tiles];
    let move = false;
    for (let i = 0; i < newTiles.length; i++) {
      let plus = 0;
      let isFinished = false;
      while (!isFinished) {
        isFinished = true;

        for (let j = newTiles.length - 1; j > 0; j--) {
          if (newTiles[j][i].value === undefined && newTiles[j - 1][i].value) {
            isFinished = false;
            newTiles[j][i].setValue(newTiles[j - 1][i].value);
            newTiles[j - 1][i].setValue(undefined);
            move = true;
          } else if (
            !plus &&
            !newTiles[j][i].isEmpty() &&
            newTiles[j][i].value === newTiles[j - 1][i].value
          ) {
            newTiles[j][i].setValue(newTiles[j][i].value * 2);
            newTiles[j - 1][i].setValue(undefined);
            plus++;
            isFinished = false;
            move = true;
            if (!newTiles2) {
              this.moveTilesToBottom(newTiles, true);
              return;
            }
          }
        }
      }
    }
    this.afterMove(move, newTiles, add);
  };
  // right
  moveTilesToRight = (newTiles2?: Tile[][], add?: boolean) => {
    let newTiles: Tile[][] = newTiles2 ?? [...this.tiles];
    let move: boolean = false;
    for (let i = 0; i < newTiles.length; i++) {
      let plus = 0;
      let isFinished = false;

      while (!isFinished) {
        isFinished = true;
        for (let j = newTiles[i].length - 1; j > 0; j--) {
          if (newTiles[i][j].value === undefined && newTiles[i][j - 1].value) {
            isFinished = false;
            newTiles[i][j].setValue(newTiles[i][j - 1].value);
            newTiles[i][j - 1].setValue(undefined);
            move = true;
          } else if (
            !plus &&
            !newTiles[i][j].isEmpty() &&
            newTiles[i][j].value === newTiles[i][j - 1].value
          ) {
            newTiles[i][j].setValue(newTiles[i][j].value * 2);
            newTiles[i][j - 1].setValue(undefined);
            plus++;
            isFinished = false;
            move = true;
            if (!newTiles2) {
              this.moveTilesToRight(newTiles, true);
              return;
            }
          }
        }
      }
    }
    this.afterMove(move, newTiles, add);
  };
  // left
  moveTilesToLeft = (newTiles2?: Tile[][], add?: boolean) => {
    let newTiles: Tile[][] = newTiles2 ?? [...this.tiles];

    let move: boolean = false;

    for (let i = 0; i < newTiles.length; i++) {
      let plus = 0;
      let isFinished = false;
      while (!isFinished) {
        isFinished = true;
        for (let j = 0; j < newTiles[i].length - 1; j++) {
          if (newTiles[i][j].value === undefined && newTiles[i][j + 1].value) {
            isFinished = false;
            newTiles[i][j].setValue(newTiles[i][j + 1].value);
            newTiles[i][j + 1].setValue(undefined);
            move = true;
          } else if (
            !plus &&
            !newTiles[i][j].isEmpty() &&
            newTiles[i][j].value === newTiles[i][j + 1].value
          ) {
            newTiles[i][j].setValue(newTiles[i][j].value * 2);
            newTiles[i][j + 1].setValue(undefined);
            plus++;
            isFinished = false;
            move = true;
            if (!newTiles2) {
              this.moveTilesToLeft(newTiles, true);
              return;
            }
          }
        }
      }
    }
    this.afterMove(move, newTiles, add);
  };
  asyncRandomAdd = (ms?: number) => {
    new Promise((res) => {
      setTimeout(() => {
        res("as");
      }, ms || 200);
    }).then(() => {
      this.addRandomToEmptyTile();
    });
  };

  areTilesEmpty(): boolean {
    this.loop((tile) => {
      if (!tile.isEmpty()) {
        return false;
      }
    });
    return true;
  }

  addFirstRandom(): void {
    let added: number = 0;
    let randomCount: number = 2;
    let randomFirst: number = Math.floor(Math.random() * 16);
    let randomSecond: number = Math.floor(Math.random() * 16);
    while (randomSecond === randomFirst) {
      randomSecond = Math.floor(Math.random() * 16);
    }
    this.loop((tile) => {
      if (added >= randomCount) {
        return;
      }
      if (
        tile.index === randomFirst ||
        (tile.index === randomSecond && tile.isEmpty())
      ) {
        tile.setValue(this.randomTwoOrFour());
        added++;
      }
    });

    return;
  }

  addRandomToEmptyTile(): void {
    let random: number = Math.floor(Math.random() * 16);
    while (!this.findTileByIndex(random, this.tiles).isEmpty()) {
      random = Math.floor(Math.random() * 16);
    }
    this.loop((tile) => {
      if (tile.index === random && tile.isEmpty()) {
        tile.setValue(this.randomTwoOrFour());
        return;
      }
    });
    if (this.areTilesFull() && this.isGameOver()) {
      console.log("Game Over Lox");
    }
    return;
  }

  private loop(cb: (value: Tile, x: number, y: number) => void) {
    const tiles = [...this.tiles];
    tiles.forEach((tileRow, rowIndex) => {
      tileRow.forEach((tile, columnIndex) => {
        cb(tile, rowIndex, columnIndex);
      });
    });
    this.setTiles(tiles);
  }

  init(tilesState: ReturnType<typeof useState<Tile[][]>>) {
    this.tiles = tilesState[0];
    this._setTiles = tilesState[1];
    const row = Math.floor(Math.sqrt(this.size));
    const tiles = [];
    let index = 0;
    for (let i = 0; i < row; i++) {
      const rowArray = [];
      for (let j = 0; j < row; j++) {
        rowArray.push(new Tile(index));
        index++;
      }
      tiles.push(rowArray);
    }
    this.setTiles(tiles);
  }
  areTilesFull() {
    let are: boolean = true;
    this.loop((tile) => {
      if (tile.isEmpty()) {
        are = false;
        return;
      }
    });
    return are;
  }
  isGameOver(): boolean {
    let tiles = this.tiles;
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles.length - 1; j++) {
        if (tiles[i][j].value === tiles[i][j + 1].value) {
          return false;
        }
      }
    }
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles.length - 1; j++) {
        if (tiles[j][i].value === tiles[j + 1][i].value) {
          return false;
        }
      }
    }
    return true;
  }
}
