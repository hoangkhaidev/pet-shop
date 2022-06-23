/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import useRouter from 'utils/hooks/useRouter';
import useFetchData from 'utils/hooks/useFetchData';
import { clearPage, setPageName } from 'features/parentParam/parentParam';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import MainCard from 'ui-component/cards/MainCard';
import Loading from 'views/Loading/Loading';
import ButtonGroup, { BackButton, ResetButton } from 'views/Button/Button';

const useStyles = makeStyles(() => ({
  formStyle: {
    width: '60%',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    }
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

const SubAccountView = () => {

  const navigate = useNavigate();
  const router = useRouter();
  const classes = useStyles();
  const roleUser = useSelector((state) => state.roleUser);
  const dispatch = useDispatch();

  const { dataResponse, isLoading, isHasPermission  } = useFetchData(`/api/subs/${router.query?.id}`);
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = 'Sub Account Detail';
  }, [router]);

  useEffect(() => {
    document.title = 'Sub Account Detail';
  }, []);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  const onCancel = () => {
    navigate('/sub/list');
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <MainCard title='Sub Account Detail'>
        {(roleUser.account_type === 'brand') && (
          <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Current Brand:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.brand_names}  
            </span>
          </div>
        )}
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Name:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.name}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Role:
            </span>
            <span className={classes.profileNameDisplay}>
                {data?.role_name}  
            </span>
        </div>
        <div className={classes.playerInfoName}>
            <span className={classes.playerNameDisplay}>
                Whitelist IP Address:
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

export default SubAccountView;
