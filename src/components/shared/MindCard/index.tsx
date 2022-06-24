import { css } from "@emotion/react";
import { time } from "console";
import { ComponentPropsWithRef, useEffect, useState } from "react";
import { text } from "stream/consumers";
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
  updateRect: (mind: Mind, mmid: string) => void;
  keyProps: number;
}

const MindCard = ({ mindItem, updateRect, keyProps }: MindCardProps) => {
  const [x, setX] = useState(mindItem.xVal);
  const [y, setY] = useState(mindItem.yVal);
  const [parasite, setParasite] = useState(false);

  let sampleCss;

  useEffect(() => {
    // console.log("succes")

    sampleCss = css`
      color: red;
    `;

    // console.log(sampleCss.styles)

    if (!mindItem.ref || !mindItem.ref.current) return;

    const rect = mindItem.ref.current.getBoundingClientRect();
    const current = mindItem.ref.current;
    let xRandom = [-2, -1, 1, 2];
    let yRandom = [-2, -1, 1, 2];
    let xRandomConfli = [1, 2];
    let yRandomConfli = [1, 2];
    let xCount = 0;
    let dx = xRandom[Math.floor(Math.random() * xRandom.length)];
    // console.log(dx)
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

      // console.log(test.length);

      let a = 0;
      try {
        for (let i in test) {
          // console.log(test.length);
          let boundingClientRect = test[a].getBoundingClientRect();

          // console.log( Math.abs(xCount+600) - Math.abs(boundingClientRect.x) );

          // console.log( Math.abs(yCount+300) - Math.abs(boundingClientRect.y) );

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
                // alert(test[a].getAttribute("class") + " $$$ " + current.getAttribute("class"));
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

            //   if(
            // Math.round(yCount*0.1) <= Math.round(boundingClientRect.y-300)*0.1 &&
            // Math.round(yCount*0.1) >= Math.round(boundingClientRect.y-200)*0.1 ){
            //   if(test[a].textContent != current.textContent){
            //     console.log("test2");
            //   }

            // test[a].remove();
          }

          a++;
        }
      } catch (e) {
        // console.log(e)
      }

      // alert("test")
      // setTime(time + 100)
      // console.log(time)
      // updateRect({
      //     ...mindItem,
      //     xVal: rect.left + cnt,
      //     yVal: rect.top,
      //   }, mindItem.id);
    }, 10);
  }, [keyProps]);

  return (
    <li
      ref={mindItem.ref}
      css={[item, sampleCss]}
      style={{
        position: "absolute",
        top: x,
        left: y,
      }}
    >
      <p>{mindItem.word}</p>
      {/* <p>x = {x}</p>
        <p>y = {y}</p> */}
    </li>
  );
};

export default MindCard;
