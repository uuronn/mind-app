import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

interface CreateButtonProps extends ComponentPropsWithRef<"button"> {
  createHandler: () => void;
}

const button = css`
  width: 50px;
  height: 50px;
  background: #f2f2f2;
  position: absolute;
  top: 30px;
  right: 50px;
  border: 3px solid #000;
  border-radius: 50%;
  font: 600 30px Montserrat;
  color: #000;
  transition: all 0.3s;
  z-index: 10;

  &:hover {
    border: 3px solid #67a8dd;
    color: #67a8dd;
  }
`;

const CreateButton = ({ createHandler }: CreateButtonProps) => {
  return (
    <button css={button} onClick={createHandler}>
      +
    </button>
  );
};

export default CreateButton;
