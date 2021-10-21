/* eslint-disable arrow-body-style */
import { Button } from "@material-ui/core";

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
