import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import TitlePage from "src/components/shared/TitlePage/TitlePage";

const SubAccountEdit = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    console.log("data", data);
  };

  const onCancel = () => {
    navigate("/sub/list");
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
        <ButtonGroup>
          <SubmitButton />
          <ResetButton text="Cancel" onAction={onCancel} />
        </ButtonGroup>
      </form>
    </ContentCardPage>
  );
};

export default SubAccountEdit;
