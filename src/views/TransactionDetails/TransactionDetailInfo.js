/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
// import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import { makeStyles } from '@mui/styles';
import useFetchData from 'utils/hooks/useFetchData';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import MainCard from 'ui-component/cards/MainCard';
import Loading from 'views/Loading/Loading';
import { Typography } from '@mui/material';
// import { Button } from '@mui/material';
import { BackButton } from 'views/Button/Button';

const useStyles = makeStyles((theme) => ({
  transactionDetailInfo: {
    width: "100%"
  },
  infoLine: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  labelLine: {
    fontWeight: "bold",
    minWidth: 100
  },
  titleTransaction: {
    fontWeight: '600 !important',
  }
}));

const TransactionDetailInfo = ({onClose, roundId}) => {
  const classes = useStyles();

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/transaction/round/${roundId}/details`,
    null
  );
  
  const [data, setData] = useState([]);
  const [dataCurrency, setDataCurrency] = useState([]);

  useEffect(() => {
    const mapData = get(dataResponse, 'round_detail', []);
    setData(mapData);
  }, [dataResponse]);

  useEffect(() => {
    const mapDataCurrency = get(dataResponse, 'currency', []);
    setDataCurrency(mapDataCurrency);
  }, [dataResponse]);

  const onCancel = () => {
    onClose();
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <MainCard sx={{mb: '15px'}}>
      {isLoading && <Loading />}
      <Typography variant="h3" gutterBottom className={classes.titleTransaction}>
        Transaction Detail
      </Typography>
      
      <div className={classes.transactionDetailInfo}>
          <div className={classes.infoLine}>
            <div className={classes.labelLine}>
              Player:
            </div>
            <div>
              <b>{data.member_id} - {data.username}</b> ({dataCurrency.code} - {dataCurrency.name} (1 = {dataCurrency.symbol}{dataCurrency.ratio_rate}))
            </div>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.labelLine}>
              Round ID:
            </div>
            <div>
              <b>{data.round_id}</b>
            </div>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.labelLine}>
              Status:
            </div>
            <div style={{ textTransform: 'capitalize' }}>
              {data.status}
            </div>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.labelLine}>
              Started:
            </div>
            <div>
              {data.start_date}
            </div>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.labelLine}>
              Completed:
            </div>
            <div>
              {data.end_date}
            </div>
          </div>
      </div>
      <BackButton
        text="Back"
        onAction={() => onCancel()}
      />
    </MainCard>
  );
};

export default TransactionDetailInfo;
