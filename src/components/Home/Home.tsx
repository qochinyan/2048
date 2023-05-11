import { useState } from "react";
import Game from "../Game/Game";

import "./Home.scss";

const Home = () => {
  const [play, setPLay] = useState({ pending: "menu", count: 0 });
  return (
    <div className="screen-container">
      {play.pending === "menu" && (
        <button
          className="play-button"
          onClick={() => {
            setPLay((e) => ({ ...e, pending: "choose" }));
          }}
        >
          Play
        </button>
      )}

      {(play.pending === "choose" && (
        <div
          className="choose-block"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <span style={{ fontSize: "24px", textAlign: "center" }}>
            How many blocks will each line include
          </span>
          <input
            value={play.count > 0 ? play.count : ""}
            style={{
              width: "344px",
              height: "30px",
              padding: "0 10px",
            }}
            type="text"
            onChange={(e) => {
              let a = e.target.value;
              if (
                ((typeof Number(a) == "number" && Number(a)) || a === "") &&
                Number(a) < 10
              ) {
                setPLay((play) => ({ ...play, count: Number(a) }));
              }
            }}
          />
          <button
            style={{ padding: "10px 30px", color: "grey", border: "none" }}
            onClick={() => {
              if (!(play.count >= 4 && play.count <= 8)) {
                alert(
                  "count must be 4 at least & less or equal to 8 (must be round numberic)"
                );
                return;
              }
              setPLay(p=>({count:p.count**2,pending:"start"}))
            }}
          >
            Play
          </button>
        </div>
      )) ||
        (play.pending === "start" && <Game boardNum={play.count} />)}
    </div>
  );
};

export default Home;
