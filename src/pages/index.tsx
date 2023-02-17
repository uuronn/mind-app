import { css } from "@emotion/react";
import { useState, createRef } from "react";
import CreateButton from "../components/shared/CreateButton";
import MindCard from "../components/shared/MindCard";

const home = css`
  width: 100vw;
  height: 100vh;
  list-style: none;
`;

interface MindApi {
  word: string;
  mmid: string;
}

export interface Mind extends MindApi {
  xVal: number;
  yVal: number;
  ref?: React.RefObject<HTMLDivElement>;
}

const Home = () => {
  const [mindList, setMindList] = useState<Mind[]>([]);

  const createHandler = () => {
    const value = prompt("アイデアを入力してください");
    if (value === "" || value === null) return;

    const newMind: Mind = {
      mmid: value,
      word: value,
      xVal: 600,
      yVal: 300,
      ref: createRef(),
    };

    setMindList([...mindList, newMind]);
  };

  return (
    <>
      <ul css={home}>
        {mindList.map((mindItem, i) => (
          <li key={i}>
            <MindCard mindItem={mindItem} keyProps={i} />
          </li>
        ))}
      </ul>
      <CreateButton createHandler={createHandler}>+</CreateButton>
    </>
  );
};

export default Home;
