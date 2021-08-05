import { useState, useCallback } from "react";
// import TooltipIcon from "src/components/shared/TooltipIcon/TooltipIcon";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AdjustIcon from '@material-ui/icons/Adjust';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  title__text: {
    marginBottom: "1rem",
  },

  title__groupButton: {
      display: "flex",
      justifyContent: "space-evenly",
  }
}));

const UpdateCommission = ({onHandleUpdate, name, brand_id, row }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const updateItem = () => {
    onClose();
    onHandleUpdate(brand_id, name , row);
  }

  return (
    <div>
      <Button
        startIcon={<AdjustIcon fontSize="small" />}
        variant="contained"
        onClick={onOpenModal}
        color="primary"
      >
        Submit
      </Button>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title={'Confirmation'} />
            <div className={classes.title__text}>{`Are you sure you want to update this: ${name}?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => updateItem()}>
                    OK
                </Button>
                <Button variant="contained" color="secondary" onClick={() => onClose()}>
                    Cancel
                </Button>
            </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default UpdateCommission;
