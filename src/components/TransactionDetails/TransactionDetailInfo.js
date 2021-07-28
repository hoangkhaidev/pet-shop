/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { Button, makeStyles } from "@material-ui/core";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import { useEffect, useState } from 'react';
import useFetchData from 'src/utils/hooks/useFetchData';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import Loading from '../shared/Loading/Loading';
import get from 'lodash/get';

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

  // useEffect(() => {
  //   console.log(dataCurrency);
  // }, [dataCurrency]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const onCancel = () => {
    // navigate('/players/players');
    onClose();
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <ContentCardPage>
      {isLoading && <Loading />}
      <Typography variant="h6" gutterBottom className={classes.titleTransaction}>
        Transaction Detail
      </Typography>
      <Button
        startIcon={<ClearAllIcon fontSize="small" />}
        variant="contained"
        type="button"
        color="secondary"
        onClick={() => onCancel()}
      >
        Back
      </Button>
      <div className={classes.transactionDetailInfo}>
        {/* {Object.keys(playerTransactionDetails).map(key => ( */}
          <div className={classes.infoLine}>
            <div className={classes.labelLine}>
              Player:
            </div>
            <div>
              <b>{data.member_id} - {data.username}</b> ({dataCurrency.code} - {dataCurrency.name} (1 = {dataCurrency.symbol}{dataCurrency.rate}))
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
        {/* ))} */}
      </div>
    </ContentCardPage>
  );
};

export default TransactionDetailInfo;
