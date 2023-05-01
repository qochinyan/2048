import Tile from "./Tile";
import { useState } from "react";

export default class Board {
  private _setTiles: React.Dispatch<React.SetStateAction<Tile[][]>>;
  tiles: Tile[][];
  lastTiles: Tile[][];
  move: Boolean = true;

  constructor(readonly size: number = 16) {}

  randomTwoOrFour = () => {
    return Math.random() > 0.15 ? 2 : 4;
  };

  setTiles(tiles: Tile[][]) {
    this.lastTiles = [...this.tiles];
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
  // top
  moveTilesToTop: () => void = () => {
    let newTiles: Tile[][] = [...this.tiles];
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
          }
        }
      }
    }
    this.setMove(move);
    this.setTiles(newTiles);
    if (this.move) {
      this.asyncRandomAdd();
    }
  };
  // bottom
  moveTilesToBottom: () => void = () => {
    let newTiles: Tile[][] = [...this.tiles];
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
          }
        }
      }
    }
    this.setMove(move);
    this.setTiles(newTiles);
    if (this.move) {
      this.asyncRandomAdd();
    }
  };
  // right
  moveTilesToRight: () => void = () => {
    let newTiles: Tile[][] = [...this.tiles];
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
          }
        }
      }
    }
    this.setMove(move);
    this.setTiles(newTiles);
    if (this.move) {
      this.asyncRandomAdd();
    }
  };
  // left
  moveTilesToLeft: () => void = () => {
    let newTiles: Tile[][] = [...this.tiles];
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
          }
        }
      }
    }
    this.setMove(move);
    this.setTiles(newTiles);
    if (this.move) {
      this.asyncRandomAdd();
    }
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
    this.lastTiles = [...this.tiles];
  }
}