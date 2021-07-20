import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import remove from 'lodash/remove';
import get from 'lodash/get';
import useFetchData from 'src/utils/hooks/useFetchData';
import { toast } from 'react-toastify';

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
  const roleUser = useSelector((state) => state.roleUser);

  // console.log(roleUser);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      let check = false;
      item.map((item1) => {
        if (item1 === '') check = true;
        return item1;
      })
      if (check === true) item = null;
      else item = item.join('.');
      return item;
    }).filter((item) => item)

    const form = {
      username: dataform.username,
      brand_ids: dataform?.brand ? [dataform?.brand] : [],
      display_name: dataform.name,
      password: dataform.password,
      password_confirmation: dataform.confirm_password,
      role_id: dataform.role,
      whitelist_ips: formatWLIPs,
    };
    console.log(form)
    try {
      const response = await api.post('/api/subs/create', form);
      if (get(response, 'success', false)) {
        toast.success('Create SubAccount Success', {
          onClose: navigate('/sub/list'),
        });
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
    // setWhitelistIP(newArray);
    if (newArray.length <= 20 ) setWhitelistIP(newArray);
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
          namefileld="brand"
          control={control}
          id="brand"
          errors={errors?.brand}
          type="text"
          label="Brand"
        /> */}
        {!(roleUser.account_type === 'admin') && (
          <SelectField
            namefileld="brand"
            id="brand"
            label="Brand"
            fullWidth={false}
            control={control}
            errors={errors?.brand}
            options={brandData}
            defaultValue=""
          />
        )}
        <InputField
          required
          namefileld="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          pattern={/^[a-z0-9_]{3,15}$/}
          helperText="length from 3 to 15 chars, allow letter, digit and underscore()"
        />
        <InputField
          namefileld="name"
          control={control}
          id="name"
          errors={errors?.name}
          type="text"
          label="Name"
          maxLength={100}
          helperText="max length 100 chars"
        />
        <InputField
          required
          namefileld="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText="from 6 characters and least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <InputField
          required
          namefileld="confirm_password"
          control={control}
          id="confirm_password"
          errors={errors?.confirm_password}
          type="password"
          label="Confirm Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText="from 6 characters and least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <SelectField
          id="role"
          fullWidth={false}
          label="Role"
          namefileld="role"
          control={control}
          errors={errors?.role}
          required
          options={roleData}
          defaultValue=""
        />
        <FormLabel>{t('Whitelist IP Address')}</FormLabel>
        {whitelistIP.map((item, index) => (
          <div className={classes.whitelistIPLine} key={index}>
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
