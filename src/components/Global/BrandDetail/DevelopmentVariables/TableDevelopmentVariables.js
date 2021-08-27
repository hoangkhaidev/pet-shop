import { Button, Input, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
import api from "src/utils/api";
import useFetchData from "src/utils/hooks/useFetchData";
import useRouter from "src/utils/hooks/useRouter";
import get from 'lodash/get';
import { toast } from "react-toastify";

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

const TableDevelopmentVariables = () => {
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
    // console.log(value);
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
          //toast.success('Update Refund Success');
          toast.success('Update Refund Success', {
            onClose: setTimeout(() => {
                window.location.reload()
            }, 0),   
          });
        } else {
          console.log(response)
          if (response?.err === 'err:player_not_found') {
            toast.warn('Player not found');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  const onResetRefund = () => {
    setFormStateRefund(initFormState)
  }

  //  retry
  const handleChangeCountRetry = (event) => {
    let value = event.target.value;
    // console.log(value);
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
    console.log(dataForm);
    try {
        const response = await api.post(`/api/global/brand_detail/${router.query?.id}/development_variable/update`, dataForm);
        console.log(response)
        if (get(response, 'success', false)) {
            // toast.success('Update Retry Success');
          toast.success('Update Retry Success', {
            onClose: setTimeout(() => {
                window.location.reload()
            }, 0),   
          });
        } else {
            if (response?.err === 'err:player_not_found') {
                toast.warn('Player not found');
            }
          console.log(response)
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  const onResetRetry = () => {
    setFormStateRetry(initFormState)
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
    console.log(dataForm);
    try {
        const response = await api.post(`/api/global/brand_detail/${router.query?.id}/development_variable/update`, dataForm);
        console.log(response)
        if (get(response, 'success', false)) {
          // toast.success('Update Manual Refund Success');
          toast.success('Update Manual Refund Success', {
            onClose: setTimeout(() => {
                window.location.reload()
            }, 0),   
          });
        } else {
          console.log(response)
          if (response?.err === 'err:player_not_found') {
            toast.warn('Player not found');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
  }

  const onResetMRefund = () => {
    setFormStateMRefund(initFormState)
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
    console.log(dataForm);
    try {
        const response = await api.post(`/api/global/brand_detail/${router.query?.id}/development_variable/update`, dataForm);
        console.log(response)
        if (get(response, 'success', false)) {
          // toast.success('Update Manual Retry Success');
          toast.success('Update Manual Retry Success', {
            onClose: setTimeout(() => {
                window.location.reload()
            }, 0),   
          });
        } else {
          console.log(response)
          if (response?.err === 'err:player_not_found') {
            toast.warn('Player not found');
          }
        }
    } catch (e) {
        console.log('e', e);
    }
    
  }

  const onResetMRetry = () => {
    setFormStateMRetry(initFormState)
  }
  //get api

  useEffect(() => {
    setFormStateRefund({
        count: dataResponse?.refund?.count,
        username: dataResponse?.refund?.username
    });
    setFormStateRetry({
        count: dataResponse?.retry?.count,
        username: dataResponse?.retry?.username
    });
    setFormStateMRefund({
        count: dataResponse?.m_refund?.count,
        username: dataResponse?.m_refund?.username
    });
    setFormStateMRetry({
        count: dataResponse?.m_retry?.count,
        username: dataResponse?.m_retry?.username
    });
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
