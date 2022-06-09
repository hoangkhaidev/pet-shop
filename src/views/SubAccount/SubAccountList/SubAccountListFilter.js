/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect} from "react";
import { useFormContext } from "react-hook-form";
import { func } from "prop-types";
import get from 'lodash/get';
// import SelectField from "src/components/shared/InputField/SelectField";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import api from "utils/api";
import { Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import InputField from "views/InputField/InputField";
import ButtonGroup, { ResetButton, SubmitButton } from "views/Button/Button";
import SelectField from "views/InputField/SelectField";

const SORT_FIELD = [
  {
    id: 1,
    value: "username",
    label: "Username"
  },
];

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

const USER_STATUS = [
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
  }
];

const SubAccountListFilter = ({
  onResetFilter
}) => {
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const { control } = useFormContext();
  const roleUser = useSelector((state) => state.roleUser);

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newBrand = cloneDeep(brandsData);
    newBrand?.forEach(data => {
      let optionData = {
        id: data.brand_id,
        value: data.brand_id,
        label: data.username,
      };
      mapData.push(optionData)
    });
    setBrandData([...mapData]);
  }, [brandsData, setBrandData]);

  useEffect(() => {
    if (roleUser.account_type !== 'brand') {
      onDataBrand();
    }
  }, []);

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response);
    }
  };

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
            selectDisabled= {roleUser.account_type === 'brand' ? true : false}
            control={control}
            namefileld="brand_ids"
            id="brand_ids"
            label="Brand"
            fullWidth={false}
            options={brandData}
            defaultValue="all"
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            namefileld="status_search"
            label="Status"
            id="status_search"
            fullWidth={false}
            options={USER_STATUS}
            defaultValue="all"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={4}>
            <SelectField
              control={control}
              namefileld="sort_field"
              label="Sort Field"
              id="sort_field"
              fullWidth={false}
              options={SORT_FIELD}
              defaultValue="username"
            />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            namefileld="sort_order"
            label="Sort Order"
            id="sort_order"
            fullWidth={false}
            options={SORT_ODER}
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

SubAccountListFilter.propTypes = {
  onResetFilter: func
};

SubAccountListFilter.defaultProps = {
  onResetFilter: () => {}
};

export default SubAccountListFilter;
