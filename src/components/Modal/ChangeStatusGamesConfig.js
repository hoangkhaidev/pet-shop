import { Button, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useCallback, useState } from 'react';
// import { toast } from 'react-toastify';
// import api from 'src/utils/api';
import ModalComponent from '../shared/ModalComponent/ModalComponent';
import TitlePage from '../shared/TitlePage/TitlePage';

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

const ChangeStatusGamesConfig = ({status, linkApi, dataForm}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(status);
  const [valCheck, setValCheck] = useState(null);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    onOpenModal();
    setValCheck(event.target.checked)
  };

  const onChangeStatus = async (linkApi, dataForm) => {
    setChecked(valCheck);
    onClose();
    // try {
    //   let data = await api.post(linkApi, dataForm);
    //   if(!data?.success) {
    //     toast.warn(`Failed to Change`);
    //   } else {
    //     toast.success(`Change Status Success`);
    //   }
    // } catch(e) {
    //   console.log(e)
    // }
  }

  return (
    <div>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Change Status" />
            <div className={classes.title__text}>{`Are you sure you want to change status ?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => onChangeStatus()}>
                    OK
                </Button>
                <Button variant="contained" color="secondary" onClick={() => onClose()}>
                    Cancel
                </Button>
            </div>
        </div>
      </ModalComponent>
      <Checkbox
        color="primary"
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}
export default ChangeStatusGamesConfig;