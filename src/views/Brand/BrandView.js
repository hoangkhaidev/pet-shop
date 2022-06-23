/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import useRouter from 'utils/hooks/useRouter';
import useFetchData from 'utils/hooks/useFetchData';
import { clearPage, setPageName } from 'features/parentParam/parentParam';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import MainCard from 'ui-component/cards/MainCard';
import ButtonGroup, { BackButton } from 'views/Button/Button';
import Loading from 'views/Loading/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
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


const BrandView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const roleUser = useSelector((state) => state.roleUser);
  
  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/brand/${router.query?.id}`,
    null
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);


  useEffect(() => {
    document.title = 'Brand Detail';
  }, [router]);

  const onCancel = () => {
    navigate('/brand/list');
  }
  
  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <MainCard title="Brand Detail">
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
              Operator:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.operator_name}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Name:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.brand_name}  
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
          <BackButton onAction={() => onCancel()} text='Back'/>
        </ButtonGroup>
      {isLoading && <Loading />}
    </MainCard>
  );
};

export default BrandView;
