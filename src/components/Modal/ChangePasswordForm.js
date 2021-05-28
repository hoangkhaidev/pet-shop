import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EditIcon from '@material-ui/icons/Edit';

import InputField from "src/components/shared/InputField/InputField";
import TooltipIcon from "src/components/shared/TooltipIcon/TooltipIcon";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { SubmitButton } from "src/components/shared/Button/Button";

const ChangePasswordForm = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { handleSubmit, formState: { errors }, control } = useForm();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log("data", data);
  };

  return (
    <div>
      <TooltipIcon
        title="Change password"
        arialLabel="change-password"
        IconComponent={<EditIcon />}
        onClick={onOpenModal}
      />
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Change Password" />
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <SubmitButton />
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangePasswordForm;
