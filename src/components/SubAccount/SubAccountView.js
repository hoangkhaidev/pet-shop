/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import ButtonGroup, {
  ResetButton,
} from 'src/components/shared/Button/Button';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import { useEffect, useState } from 'react';
import Loading from '../shared/Loading/Loading';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import { clearPage, setPageName } from 'src/features/parentParam/parentParam';

const useStyles = makeStyles(() => ({
  formStyle: {
    width: '50%',
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
    return () => {
      document.title = '';
    }
  }, [router]);

  useEffect(() => {
    dispatch(setPageName("sub_view"));
    return () => {
      dispatch(clearPage());
    }
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
    <ContentCardPage>
        <div className={classes.titlePage}>Sub Account Detail</div>
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
          <ResetButton text="Back" onAction={onCancel} />
        </ButtonGroup>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default SubAccountView;
