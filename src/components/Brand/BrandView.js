/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import remove from 'lodash/remove';
import get from 'lodash/get';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import FormattedNumberInput from 'src/components/shared/InputField/InputFieldNumber';
import InputField from 'src/components/shared/InputField/InputField';
import Loading from 'src/components/shared/Loading/Loading';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import clsx from 'clsx';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import api from 'src/utils/api';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import { useNavigate } from 'react-router-dom';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ProductCommission from '../Operator/ProductCommission';
import { validate } from 'validate.js';
import { useSelector } from 'react-redux';

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
    return () => {
      document.title = '';
    }
  }, [router]);

  const onCancel = () => {
    navigate('/brand/list');
  }
  
  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <ContentCardPage>
      <div className={classes.titlePage}>Brand Detail</div>
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
          <Button
            startIcon={<ClearAllIcon fontSize="small" />}
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => onCancel()}
            sx={{
              ml: 1
            }}
          >
            Back
          </Button>
        </ButtonGroup>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default BrandView;
