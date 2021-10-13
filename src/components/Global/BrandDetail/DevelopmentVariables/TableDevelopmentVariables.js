/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
import api from "src/utils/api";
import useFetchData from "src/utils/hooks/useFetchData";
import useRouter from "src/utils/hooks/useRouter";
import get from 'lodash/get';
import { toast } from "react-toastify";
import cloneDeep from "lodash.clonedeep";

const useStyles = makeStyles(() => ({
    tableDevelopment: {
      fontFamily: 'arial, sans-serif',
      borderCollapse: 'collapse',
      width: '100%',
    },
    tdDevelopment: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
    },
    inputTotal: {
        width: '100%'
    }
}));

const TableDevelopmentVariables = ({ setValueTab }) => {
  const classes = useStyles();
  const router = useRouter();

  const initFormState = {
    config_type: "",
    username: "",
    count: 0
  }

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/global/brand_detail/${router.query?.id}/development_variable`,
    null
  );

  const [formStateRefund, setFormStateRefund] = useState(initFormState);
  const [formStateRetry, setFormStateRetry] = useState(initFormState);
  const [formStateMRefund, setFormStateMRefund] = useState(initFormState);
  const [formStateMRetry, setFormStateMRetry] = useState(initFormState);
 
  const handleChangeCountRefund = (event) => {
    let value = event.target.value;
    let regex = /^\d+(\\d{0})?$/g;
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1)
      return 
    }

    setFormStateRefund((formStateRefund) => ({
        ...formStateRefund,
        count: Number(event.target.value),
    }));
    
  }

  const handleChangeInputRefund = (event) => {
    setFormStateRefund((formStateRefund) => ({
        ...formStateRefund,
        username: event.target.value,
    }));
  }

  const onUpdateRefund = async() => {
    let dataForm = {
        ...formStateRefund,
        config_type: 'refund',
    }
    try {
        const response = await api.post(`/api/global/brand_detail/${router.query?.id}/development_variable/update`, dataForm);
        if (get(response, 'success', false)) {
          toast.success('Update Refund Success');
          setValueTab(3);
        } else {
          if (response?.err === 'err:player_not_found') {
            toast.warn('Player not found');
          }
          if (response?.err === 'err:brand_not_found') {
            toast.warn('Brand not found');
          }
          if (response?.err === 'err:account_not_found') {
            toast.warn('Brand not found');
          }
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  const onResetRefund = async() => {
    let form = {
        config_type: "refund"
    }
    try {
        let response = await api.post(
          `/api/global/brand_detail/${router?.query?.id}/development_variable/reset`,
          form
        );
        if (get(response, 'success', false)) {
          toast.success('Reset Refund Success');
          setFormStateRefund(initFormState);
          setValueTab(3);
        } else {
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  //  retry
  const handleChangeCountRetry = (event) => {
    let value = event.target.value;
    let regex = /^\d+(\\d{0})?$/g;
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1)
      return 
    }

    setFormStateRetry((formStateRetry) => ({
        ...formStateRetry,
        count: Number(event.target.value),
    }));
    
  }

  const handleChangeInputRetry = (event) => {
    setFormStateRetry((formStateRetry) => ({
        ...formStateRetry,
        username: event.target.value,
    }));
  }

  const onUpdateRetry = async() => {
    let dataForm = {
        ...formStateRetry,
        config_type: 'retry',
    }
    try {
        const response = await api.post(`/api/global/brand_detail/${router.query?.id}/development_variable/update`, dataForm);
        if (get(response, 'success', false)) {
          toast.success('Update Retry Success');
          setValueTab(3);
        } else {
          if (response?.err === 'err:player_not_found') {
              toast.warn('Player not found');
          }
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  const onResetRetry = async() => {
    let form = {
        config_type: "retry"
    }
    try {
        let response = await api.post(
          `/api/global/brand_detail/${router?.query?.id}/development_variable/reset`,
          form
        );
        if (get(response, 'success', false)) {
          toast.success('Reset Retry Success');
          setFormStateRetry(initFormState);
          setValueTab(3);
        } else {
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  // m_refund
  const handleChangeInputMRefund = (event) => {
    setFormStateMRefund((formStateMRefund) => ({
        ...formStateMRefund,
        username: event.target.value,
    }));
  }

  const onUpdateMRefund = async() => {
    let dataForm = {
        ...formStateMRefund,
        config_type: 'm_refund',
    }
    try {
        const response = await api.post(`/api/global/brand_detail/${router.query?.id}/development_variable/update`, dataForm);
        if (get(response, 'success', false)) {
          toast.success('Update Manual Refund Success');
          setValueTab(3);
        } else {
          if (response?.err === 'err:player_not_found') {
            toast.warn('Player not found');
          }
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  const onResetMRefund = async() => {
    let form = {
        config_type: "m_refund"
    }
    try {
        let response = await api.post(
          `/api/global/brand_detail/${router?.query?.id}/development_variable/reset`,
          form
        );
        if (get(response, 'success', false)) {
          toast.success('Reset Manual Refund Success');
          setFormStateMRefund(initFormState);
          setValueTab(3);
        } else {
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }
  // m_retry
  const handleChangeInputMRetry = (event) => {
    setFormStateMRetry((formStateMRetry) => ({
        ...formStateMRetry,
        username: event.target.value,
    }));
  }

  const onUpdateMRetry = async() => {
    let dataForm = {
        ...formStateMRetry,
        config_type: 'm_retry',
    }
    try {
        const response = await api.post(`/api/global/brand_detail/${router.query?.id}/development_variable/update`, dataForm);
        if (get(response, 'success', false)) {
          toast.success('Update Manual Retry Success');
          setValueTab(3);
        } else {
          if (response?.err === 'err:player_not_found') {
            toast.warn('Player not found');
          }
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
    
  }

  const onResetMRetry = async() => {
    let form = {
        config_type: "m_retry"
    }
    try {
        let response = await api.post(
          `/api/global/brand_detail/${router?.query?.id}/development_variable/reset`,
          form
        );
        if (get(response, 'success', false)) {
          toast.success('Reset Manual Retry Success');
          setFormStateMRetry(initFormState);
          setValueTab(3);
        } else {
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
          }
          if (response?.err === 'err:no_permission') {
            toast.warn('No Permission');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }
  //get api

  useEffect(() => {
    let dataRefund = cloneDeep(dataResponse?.refund);
    let dataRetry = cloneDeep(dataResponse?.retry);
    let dataM_refund = cloneDeep(dataResponse?.m_refund);
    let dataM_retry = cloneDeep(dataResponse?.m_retry);
    setFormStateRefund((formStateRefund) => ({
      ...formStateRefund,
      count: dataRefund?.count ? dataRefund?.count : 0,
      username: dataRefund?.username ? dataRefund?.username : ''
    }));
    setFormStateRetry((formStateRetry) => ({
      ...formStateRetry,
      count: dataRetry?.count ? dataRetry?.count : 0,
      username: dataRetry?.username ? dataRetry?.username : ''
    }));
    setFormStateMRefund((formStateMRefund) => ({
      ...formStateMRefund,
      username: dataM_refund?.username ? dataM_refund?.username : ''
    }));
    setFormStateMRetry((formStateMRetry) => ({
      ...formStateMRefund,
      username: dataM_retry?.username ? dataM_retry?.username : ''
    }));
  }, [dataResponse]);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <>
        {isLoading && <Loading />}
        <table className={classes.tableDevelopment}>
            <tbody>
                <tr>
                    <th></th>
                    <th style={{ textAlign: 'left' }}>Nickname</th>
                    <th style={{ textAlign: 'left' }}>Times</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always Refund (for bet request)</td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'left', width: '15%' }} >
                        <Input 
                            id="standard-basic" 
                            type="text" 
                            name="username"
                            value={formStateRefund.username}
                            onChange={handleChangeInputRefund}
                            className={classes.inputTotal} 
                        />
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'right', width: '15%' }} >
                        <Input 
                            id="standard-basic" 
                            type="text" 
                            name="count"
                            value={formStateRefund.count}
                            onChange={handleChangeCountRefund}
                            className={classes.inputTotal} 
                        />
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => onUpdateRefund()}
                        >
                            Submit
                        </Button>
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={() => onResetRefund()}
                        >
                            Reset
                        </Button>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always Retry (for result request)</td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'left', width: '15%' }} >
                        <Input 
                            id="standard-basic" 
                            type="text" 
                            name="username"
                            onChange={handleChangeInputRetry}
                            value={formStateRetry.username}
                            className={classes.inputTotal} 
                        />
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'right', width: '15%' }} >
                        <Input 
                            id="standard-basic" 
                            type="text" 
                            name="count"
                            onChange={handleChangeCountRetry}
                            value={formStateRetry.count}
                            className={classes.inputTotal} 
                        />
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => onUpdateRetry()}
                        >
                            Submit
                        </Button>
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={() => onResetRetry()}
                        >
                            Reset
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table className={classes.tableDevelopment} style={{ marginTop : '2rem' }}>
            <tbody>
                <tr>
                    <th></th>
                    <th style={{ textAlign: 'left' }}>Nickname</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always manual refund (for bet request)</td>
                    <td colSpan="2" className={classes.tdDevelopment} style={{ textAlign: 'left', width: '30%' }} >
                        <Input 
                            id="standard-basic" 
                            type="text" 
                            name="username"
                            onChange={handleChangeInputMRefund}
                            value={formStateMRefund.username}
                            className={classes.inputTotal} 
                        />
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => onUpdateMRefund()}
                        >
                            Submit
                        </Button>
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={() => onResetMRefund()}
                        >
                            Reset
                        </Button>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always manual retry (for result request)</td>
                    <td colSpan="2" className={classes.tdDevelopment} style={{ textAlign: 'left', width: '30%' }} >
                        <Input 
                            id="standard-basic" 
                            type="text" 
                            name="username"
                            value={formStateMRetry.username}
                            onChange={handleChangeInputMRetry}
                            className={classes.inputTotal} 
                        />
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => onUpdateMRetry()}
                        >
                            Submit
                        </Button>
                    </td>
                    <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={() => onResetMRetry()}
                        >
                            Reset
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default TableDevelopmentVariables;
