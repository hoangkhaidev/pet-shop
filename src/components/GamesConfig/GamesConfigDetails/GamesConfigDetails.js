/* eslint-disable no-unused-vars */
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TablePayoutConfiguration from 'src/components/shared/TableComponent/TablePayoutConfiguration';
import TabBetScale from './TabBetScale';
import useFetchData from 'src/utils/hooks/useFetchData';
import { useCallback, useEffect, useState } from 'react';
import useRouter from 'src/utils/hooks/useRouter';
import cloneDeep from 'lodash/cloneDeep';
import api from 'src/utils/api';
import get from "lodash/get";
import ResetConfirm from './ResetConfirm';
import { toast } from 'react-toastify';

const useStyles = makeStyles(() => ({
  playerInfoName: {
    display: "flex",
    alignItems: "center",
    paddingTop: '20px',
  },
  playerNameDisplay: {
    textTransform: "uppercase",
    marginLeft: 16,
    marginRight: '5px',
    fontWeight: "bold"
  },
  infoContainer: {
    marginTop: 16,
    justifyContent: "space-between"
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column"
  },
  infoLine: {
    display: "flex",
    alignItems: "center",
    marginBottom: '2rem',
    // justifyContent: "space-between"
  },
  labelLine: {
    fontWeight: "bold",
    width: '40%',
  },
  w20: {
    width: '20%',
    textAlign: 'right',
  },
  w80: {
    width: '80%',
    marginLeft: '10px',
  },
  tableConfiguration: {
    display: 'flex',
    paddingTop: '20px',
  }
}));

const GamesConfigDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const router = useRouter();

  const [objFilter, setObjFilter] = useState({
    brand_id: Number(router.query.brand_id),
    game_code: router.query.id,
    currency_code: '',
  });

  const { dataResponse: dataCurrency} = useFetchData("/api/currency/public_list");

  const [currentData, setCurrentData] = useState([]);
  const [dataDetail, setDataDetail] = useState({});

  const dataGamesDetail = async (objFilter) => {
    const response = await api.post('/api/game_config/bet_scale', objFilter);
    if (get(response, "success", false)) {
      setDataDetail(response?.data);
    } else {
      console.log("response", response);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    let mapData = cloneDeep(dataCurrency);
    if (!mapData[0]) return;
    setCurrentData(mapData);
    setObjFilter({
      brand_id: Number(router.query.brand_id),
      game_code: router.query.id,
      currency_code: mapData?.[0]?.code,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCurrency]);

  useEffect(() => {
    if (objFilter.currency_code) dataGamesDetail(objFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objFilter]);

  // useEffect(() => {
  //   console.log(dataDetail);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dataDetail]);

  const onResetItem = async () => {
    let dataForm = {
      brand_id: Number(router.query.brand_id),
      bet_scale_id: dataDetail.id
    }
    const response = await api.post('/api/game_config/bet_scale/reset', dataForm);
    if (get(response, "success", false)) {
      console.log(response);
      toast.success('Reset Default Success', {
        onClose: setTimeout(() => {
            window.location.reload()
        }, 1000),   
      });
    } else {
      console.log("response", response);
    }
  }

  const onCancel = () => {
    navigate('/configuration/games');
  };


  return (
    <ContentCardPage>
      <TitlePage title="Game Details" />
      <Button
        startIcon={<ClearAllIcon fontSize="small" />}
        variant="contained"
        type="button"
        color="secondary"
        onClick={() => onCancel()}
      >
        Back
      </Button>
      <div className={classes.InfoGameConfig}>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Game Code:
          </span>
          <span className={classes.w80}> {dataDetail.game_code}</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Game Name:
          </span>
          <span className={classes.w80}> {dataDetail.game_name}</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Lines:
          </span>
          <span className={classes.w80}> {dataDetail.lines}</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Brand:
          </span>
          <span className={classes.w80}> {dataDetail.brand_name}</span>
        </div>
        {/* <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Participate in PJP:
          </span>
          <span className={classes.w80}> Disabled</span>
        </div> */}
        {/* <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Payout Configuration:
          </span>
          <span className={classes.w80}> </span>
        </div> */}
      </div>
      {/* <div className={classes.tableConfiguration}>
        <span className={classes.w20}></span> 
        <TablePayoutConfiguration />
      </div>  */}
      <div className={classes.playerInfoName}>
        <span className={classes.w20}>
          Bet Scale Configuration:
        </span>
        <span className={classes.w80}> 
          <ResetConfirm onResetItem={onResetItem} currency_code={dataDetail.currency_code} />
        </span>
      </div>
      <div className={classes.tableConfiguration}>
        <span className={classes.w20}></span> 
        <TabBetScale 
          dataDetail={dataDetail}
          currentData={currentData} 
          brand_id={router.query.brand_id}
          game_code={router.query.id}
          setObjFilter={setObjFilter}
          objFilter={objFilter}
        />
      </div> 
    </ContentCardPage>
  );
};

export default GamesConfigDetails;
