import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import remove from "lodash/remove";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from "src/components/shared/TitlePage/TitlePage";

const useStyles = makeStyles(() => ({
  whitelistIPLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

const SubAccountCreate = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);

  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    console.log("data", data);
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
      <TitlePage title="Create Sub Account" />
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
            [
              {
                id: 1,
                value: "role 1",
                label: "Role 1"
              },
              {
                id: 2,
                value: "role 2",
                label: "Role 2"
              }
            ]
          }
          defaultValue="role 1"
        />
        <FormLabel>{t("Whitelist IP Address")}</FormLabel>
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
