import { makeStyles } from '@material-ui/core/styles';

import "./Loading.scss";

const useStyles = makeStyles(() => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    display: 'block',
    zIndex: 3001,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',

    '&:before': {
      content: ' ',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  },
  contentLoading: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.overlay}>
      <div className="loadingio-spinner-pulse-lns2lqi38z">
        <div className="ldio-u8hwp9ljmor">
        </div>
      </div>
    </div>
  );
};

export default Loading;
