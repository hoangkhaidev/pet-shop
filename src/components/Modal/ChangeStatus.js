import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import SelectField from "src/components/shared/InputField/SelectField";

import StatusBadge from "src/components/shared/StatusBadge/StatusBadge";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { SubmitButton } from "src/components/shared/Button/Button";

const STATUS = [
  {
    id: 1,
    value: "active",
    label: "active",
  },
  {
    id: 2,
    value: "inactive",
    label: "inactive",
  },
  {
    id: 3,
    value: "suspended",
    label: "suspended",
  },
  {
    id: 4,
    value: "locked",
    label: "locked",
  },
];

const ChangeStatus = ({newlabel}) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, formState: { errors }, control } = useForm();

  const onOpenModal = useCallback(() => {
    console.log("chay")
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
      <StatusBadge label={newlabel} onClick={(onOpenModal)}/>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Change Status" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <SelectField
              nameField="status"
              control={control}
              errors={errors?.status}
              options={
                STATUS
              }
              defaultValue="active"
            />
            <SubmitButton />
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangeStatus;
