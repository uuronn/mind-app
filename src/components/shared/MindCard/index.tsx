import { css } from "@emotion/react";
import { ComponentPropsWithRef, useEffect, useState } from "react";
import { Mind } from "../../../pages";

const item = css`
  width: 150px;
  height: 100px;
  padding: 10px;
  border: solid 1px #000;
  border-radius: 10px;
  background: #f0f0f0;
`;

interface MindCardProps extends ComponentPropsWithRef<"li"> {
  mindItem: Mind;
  keyProps: number;
}

const MindCard = ({ mindItem, keyProps }: MindCardProps) => {
  const [x, setX] = useState(mindItem.xVal);
  const [y, setY] = useState(mindItem.yVal);

  let sampleCss;

  useEffect(() => {
    sampleCss = css`
      color: red;
    `;

    if (!mindItem.ref || !mindItem.ref.current) return;

    const rect = mindItem.ref.current.getBoundingClientRect();
    const current = mindItem.ref.current;
    let xRandom = [-2, -1, 1, 2];
    let yRandom = [-2, -1, 1, 2];
    let xRandomConfli = [1, 2];
    let yRandomConfli = [1, 2];
    let xCount = 0;
    let dx = xRandom[Math.floor(Math.random() * xRandom.length)];
    let yCount = 0;
    let dy = yRandom[Math.floor(Math.random() * yRandom.length)];

    const id = setInterval(() => {
      setX(rect.left + yCount);
      setY(rect.top + xCount);

      xCount += dx;
      yCount += dy;
      mindItem.ref;

      if (xCount > 600) {
        dx = -xRandomConfli[Math.floor(Math.random() * xRandomConfli.length)];
      } else if (xCount < -600) {
        dx = +xRandomConfli[Math.floor(Math.random() * xRandomConfli.length)];
      }

      if (yCount > 300) {
        dy = -yRandomConfli[Math.floor(Math.random() * xRandomConfli.length)];
      } else if (yCount < -300) {
        dy = +yRandomConfli[Math.floor(Math.random() * xRandomConfli.length)];
      }

      let test = null;
      test = window.document.getElementsByClassName("css-gauyje-item-MindCard");

      let a = 0;
      try {
        for (let i in test) {
          let boundingClientRect = test[a].getBoundingClientRect();

          if (
            Math.abs(Math.abs(xCount + 600) - Math.abs(boundingClientRect.x)) <
            140
          ) {
            if (
              Math.abs(
                Math.abs(yCount + 300) - Math.abs(boundingClientRect.y)
              ) < 100
            ) {
              if (
                test[a].textContent != current.textContent &&
                current.getAttribute("class") !=
                  "css-gauyje-item-MindCard parasited" &&
                test[a].getAttribute("class") !=
                  "css-gauyje-item-MindCard parasited"
              ) {
                alert("あなたのアイデアが寄生されました！！");

                //天才
                test[a].textContent =
                  (test[a].textContent! && test[a].textContent) +
                  (current.textContent! && current.textContent);

                current.remove();

                dy += Math.random() * 10000;

                dx += Math.random() * 10000;

                test[a].classList.add("parasited");

                break;
              }
            }
          }

          a++;
        }
      } catch (e) {
        console.log(e);
      }
    }, 10);
  }, [keyProps]);

  return (
    <div
      ref={mindItem.ref}
      css={[item, sampleCss]}
      style={{
        position: "absolute",
        top: x,
        left: y,
      }}
    >
      <p>{mindItem.word}</p>
    </div>
  );
};

export default MindCard;
