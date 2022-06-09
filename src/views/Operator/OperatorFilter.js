/* eslint-disable prettier/prettier */
import { useFormContext } from "react-hook-form";
import { func } from "prop-types";
import MainCard from "ui-component/cards/MainCard";
import { Grid } from "@mui/material";
import InputField from "views/InputField/InputField";
import SelectField from "views/InputField/SelectField";
import ButtonGroup, { ResetButton, SubmitButton } from "views/Button/Button";

const SORT_ODER = [
  {
    id: 1,
    value: "asc",
    label: "ASC"
  },
  {
    id: 2,
    value: "desc",
    label: "DESC"
  }
];

const OPERATOR_STATUS = [
  {
    id: 1,
    value: "all",
    label: "All"
  },
  {
    id: 2,
    value: "active",
    label: "Active"
  },
  {
    id: 3,
    value: "suspended",
    label: "Suspended"
  },
  {
    id: 4,
    value: "locked",
    label: "Locked"
  },
  {
    id: 5,
    value: "inactive",
    label: "Inactive"
  }
];

const OperatorListFilter = ({onResetFilter}) => {
  const { control } = useFormContext();

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={4}>
          <InputField
            control={control}
            namefileld="name_search"
            type="text"
            label="Name or Username"
            id="name_search"
            fullWidth={false}
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            namefileld="status_search"
            id="status_search"
            label="Status"
            fullWidth={false}
            options={OPERATOR_STATUS}
            defaultValue="all"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            namefileld="sort_field"
            id="sort_field"
            label="Sort field"
            fullWidth={false}
            options={
              [
                {
                  id: 1,
                  value: "username",
                  label: "Username"
                },
                {
                  id: 2,
                  value: "operator_name",
                  label: "Name"
                }
              ]
            }
            defaultValue="username"
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            namefileld="sort_order"
            id="sort_order"
            label="Sort order"
            options={SORT_ODER}
            fullWidth={false}
            defaultValue="asc"
          />
        </Grid>
      </Grid>
      <ButtonGroup>
        <SubmitButton text="Search"/>
        <ResetButton onAction={onResetFilter} />
      </ButtonGroup>
    </MainCard>
  );
};

OperatorListFilter.propTypes = {
  onResetFilter: func
};

OperatorListFilter.defaultProps = {
  onResetFilter: () => {}
};

export default OperatorListFilter;
