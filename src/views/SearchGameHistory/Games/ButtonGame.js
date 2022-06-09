/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */

import { Button } from "@mui/material";

const ButtonGame = ({ title, onChangeTransaction, game_name }) => {

  const onGame = (gameName) => {
    onChangeTransaction(gameName);
  };

  return (
    <>
      <Button style={{ textTransform: 'none' }} onClick={() => onGame(game_name)}>{title}</Button>
    </>
  );
};

export default ButtonGame;
