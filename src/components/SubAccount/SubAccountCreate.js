import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import remove from 'lodash/remove';
import get from 'lodash/get';
import useFetchData from 'src/utils/hooks/useFetchData';

import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import InputField from 'src/components/shared/InputField/InputField';
import SelectField from 'src/components/shared/InputField/SelectField';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import api from 'src/utils/api';

const useStyles = makeStyles(() => ({
  whitelistIPLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const SubAccountCreate = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [roleData, setRoleData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const { dataResponse: dataRole } = useFetchData('/api/role');
  const { dataResponse: dataBrand } = useFetchData('/api/brand');

  useEffect(() => {
    if (dataRole.length <= 0) return;
    let mapdata = [];
    dataRole.forEach((data) => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.role_name,
      };
      mapdata.push(optionData);
    });
    setRoleData([...mapdata]);
  }, [dataRole, setRoleData]);

  useEffect(() => {
    let mapdata = [];
    let newBrand = dataBrand?.list;
    if (!newBrand) return;
    if (newBrand.length <= 0) return;
    newBrand.forEach((data) => {
      let optionData = {
        id: data.BrandId,
        value: data.BrandId,
        label: data.username,
      };
      mapdata.push(optionData);
    });
    setBrandData([...mapdata]);
  }, [dataBrand, setBrandData]);

  const onSubmit = async (dataform) => {
    const formatWLIPs = whitelistIP.map((item) => {
      const joinStr = item.join('.');
      return joinStr;
    });
    const form = {
      username: dataform.username,
      brand_ids: [dataform.brand],
      display_name: dataform.name,
      password: dataform.password,
      password_confirmation: dataform.confirm_password,
      role_id: dataform.role,
      whitelist_ips: formatWLIPs,
    };
    try {
      const response = await api.post('/api/subs/create', form);
      if (get(response, 'success', false)) {
        navigate('sub/list');
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            setError(field, {
              type: 'validate',
              message: response?.data[field],
            });
          }
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const onCancel = () => {
    navigate('/sub/list');
  };

  const onChangeWhitelistIp = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = whitelistIP.slice();
    cloneArr[rowIndex][index] = formattedValue;
    setWhitelistIP(cloneArr);
  };

  const onAddingWLIPAddress = () => {
    const cloneArr = whitelistIP.slice();
    const newArray = [...cloneArr, ['', '', '', '']];
    setWhitelistIP(newArray);
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  return (
    <ContentCardPage>
      <TitlePage title="Create Sub Account" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '50%' }}>
        {/* <InputField
          required
          nameField="brand"
          control={control}
          id="brand"
          errors={errors?.brand}
          type="text"
          label="Brand"
        /> */}
        <SelectField
          nameField="brand"
          id="brand"
          label="Brand"
          fullWidth={false}
          control={control}
          errors={errors?.brand}
          options={brandData}
          defaultValue=""
        />
        <InputField
          required
          nameField="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          helperText="length from 3 to 15 chars, allow letter, digit and underscore()"
        />
        <InputField
          nameField="name"
          control={control}
          id="name"
          errors={errors?.name}
          type="text"
          label="Name"
          helperText="max length 100 chars"
        />
        <InputField
          required
          nameField="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          helperText="from 6 characters and least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <InputField
          required
          nameField="confirm_password"
          control={control}
          id="confirm_password"
          errors={errors?.confirm_password}
          type="password"
          label="Confirm Password"
          helperText="from 6 characters and least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <SelectField
          id="role"
          fullWidth={false}
          label="Role"
          nameField="role"
          control={control}
          errors={errors?.role}
          options={roleData}
          defaultValue=""
        />
        <FormLabel>{t('Whitelist IP Address')}</FormLabel>
        {whitelistIP.map((item, index) => (
          <div className={classes.whitelistIPLine}>
            <IPAddressInput
              key={index}
              apiWLIP={item}
              onChange={onChangeWhitelistIp}
              rowIndex={index}
            />
            {whitelistIP.length - 1 === index ? (
              <Button
                color="primary"
                variant="contained"
                onClick={onAddingWLIPAddress}
              >
                <AddIcon />
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => onRemoveWLIPAddress(index)}
              >
                <RemoveIcon />
              </Button>
            )}
          </div>
        ))}
        <ButtonGroup>
          <SubmitButton />
          <ResetButton text="Cancel" onAction={onCancel} />
        </ButtonGroup>
      </form>
    </ContentCardPage>
  );
};

export default SubAccountCreate;
