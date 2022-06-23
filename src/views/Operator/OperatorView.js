/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useRouter from 'utils/hooks/useRouter';
import useFetchData from 'utils/hooks/useFetchData';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import MainCard from 'ui-component/cards/MainCard';
import ButtonGroup, { BackButton } from 'views/Button/Button';
import Loading from 'views/Loading/Loading';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  rootChip: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: `${theme.spacing(0.5)} !important`,
    },
  },
  playerInfoName: {
    display: "flex",
    paddingTop: 20,
  },
  playerNameDisplay: {
    marginRight: '5px',
    fontWeight: "bold",
    width: '50%',
  },
  profileNameDisplay: {
    width: '50%',
  },
  divItem: {
    width: '50%',
  },
  spanItem: {
    paddingBottom: 10,
  },
  titlePage: {
    fontSize: '24px',
    fontWeight: 600,
  }
}));

const OperatorView = () => {
  const classes = useStyles();
  const router = useRouter();
  const navigate = useNavigate();
  const parentParam = useSelector((state) => state.parentParam.parentParam);

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/operators/${router.query?.id}`,
    null
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  useEffect(() => {
    document.title = 'Operator Detail';
  }, [router]);

  const onCancel = () => {
    navigate(parentParam);
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <MainCard title="Operator Detail">
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Name:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.operator_name}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Support Name:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.support_email}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Finance Email:
            </span>
            <div className={classes.divItem}>
                {
                    data?.finance_emails?.map((item, index) => (
                        <div key={index} className={classes.spanItem}>
                            <span>
                                {item}  
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Product:
            </span>
            <div className={classes.divItem}>
                {
                    data?.product_commission?.map((item, index) => (
                        <div key={index} className={classes.spanItem}>
                            <span style={{marginRight: '5px'}}>
                                {item?.product_name}  
                            </span>
                            <span style={{marginRight: '5px'}}>
                                Commission  
                            </span>
                            <span style={{marginRight: '5px'}}>
                                {item?.commission}% 
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                API Endpoint:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.api_endpoint}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Whitelist IP Address for API:
            </span>
            <div className={classes.divItem}>
                {
                    data?.api_white_list_ip?.map((item, index) => (
                        <div key={index} className={classes.spanItem}>
                            <span>
                                {item}  
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Operator Admin Account:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.username}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Username:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.username}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Whitelist IP Address for BO:
            </span>
            <div className={classes.divItem}>
                {
                    data?.whitelist_ips?.map((item, index) => (
                        <div key={index} className={classes.spanItem}>
                            <span>
                                {item}  
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
        <ButtonGroup>
          <BackButton
            text="Back"
            onAction={() => onCancel()}
          />
        </ButtonGroup>
      {isLoading && <Loading />}
    </MainCard>
  );
};

export default OperatorView;
