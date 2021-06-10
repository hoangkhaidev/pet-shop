import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import remove from "lodash/remove";
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import { toast } from "react-toastify";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import TitlePage from "src/components/shared/TitlePage/TitlePage";

import useFetchData from "src/utils/hooks/useFetchData";
import useRouter from "src/utils/hooks/useRouter";
import { useEffect, useState } from "react";
import get from "lodash/get";

import FormLabel from '@material-ui/core/FormLabel';

import api from "src/utils/api";

const useStyles = makeStyles(() => ({
  whitelistIPLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

const SubAccountEdit = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const router = useRouter();
  const classes = useStyles();

  const { dataResponse } = useFetchData(`/api/subs/${router.query?.id}`);
  const { dataResponse: dataRole } = useFetchData("/api/role");
  const [roleData, setRoleData] = useState([]);
  const [data, setData] = useState(null)
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);

  useEffect(() => {
    setValue("brand", get(dataResponse, "brand_ids", ""));
    setValue("username", get(dataResponse, "username", ""));
    setValue("name", get(dataResponse, "name", ""));
    setData(dataResponse)
  }, [dataResponse, setValue])

  useEffect(() => {
    const formatWhitelistIP = ["..."].map((ip) => ip.split('.'));
    setWhitelistIP(formatWhitelistIP);

    if (dataRole.length <= 0) return;
    let mapdata = []
    dataRole.forEach(data => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.roleName,
      };
      mapdata.push(optionData)
    });
    setRoleData([...mapdata]);
  }, [dataRole, setRoleData])
  
  const onSubmit = async (dataform) => {
    const formatWLIPs = whitelistIP.map((item) => {
      const joinStr = item.join('.');
      return joinStr;
    });
    const form = {
      brand_ids: dataform.brand,
      display_name: dataform.name,
      password: dataform.password,
      password_confirmation: dataform.confirm_password,
      role_id: dataform.role,
      whitelist_ips: formatWLIPs,
    };
    try {
      let data = await api.post(`/api/subs/${router.query?.id}/update`, form);
      if(data?.success) {
        toast.success("Update subs Success", {
          onClose: navigate("/subs/list")
        });
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const onCancel = () => {
    navigate("/sub/list");
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
      <TitlePage title="Edit Sub Account" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "50%" }}>
        <InputField
          required
          nameField="brand"
          control={control}
          id="brand"
          errors={errors?.brand}
          type="text"
          label="Brand"
        />
        <InputField
          required
          nameField="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
        />
        <InputField
          nameField="name"
          control={control}
          id="name"
          errors={errors?.name}
          type="text"
          label="Name"
        />
        <InputField
          required
          nameField="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
        />
        <InputField
          required
          nameField="confirm_password"
          control={control}
          id="confirm_password"
          errors={errors?.confirm_password}
          type="password"
          label="Confirm Password"
        />
        <SelectField
          nameField="role"
          control={control}
          errors={errors?.role}
          options={
            roleData
          }
          defaultValue=""
        />
        <FormLabel>Whitelist IP Address</FormLabel>
        {(whitelistIP || []).map((item, index) => (
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

export default SubAccountEdit;
