import { useState, useEffect} from "react";
import { useFormContext } from "react-hook-form";
import useFetchData from "src/utils/hooks/useFetchData";
import Grid from "@material-ui/core/Grid";
import { func } from "prop-types";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import SelectField from "src/components/shared/InputField/SelectField";
import { SORT_ODER, USER_STATUS } from "src/constants";

const SubAccountListFilter = ({
  onResetFilter
}) => {
  const [brandData, setBrandData] = useState([]);
  const { control } = useFormContext();

  const { dataResponse: dataBrand} = useFetchData("/api/brand");

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newBrand;
    if(dataBrand?.list) {
      newBrand = [...dataBrand?.list];
    }
    if (!newBrand) return;
    if (newBrand.length <= 0) return;
    newBrand.forEach(data => {
      let optionData = {
        id: data.BrandId,
        value: data.BrandId,
        label: data.username,
      };
      mapData.push(optionData)
    });
    setBrandData([...mapData]);
  }, [dataBrand, setBrandData])

  return (
    <ContentCardPage>
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
            namefileld="brand"
            id="brand"
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
    </ContentCardPage>
  );
};

SubAccountListFilter.propTypes = {
  onResetFilter: func
};

SubAccountListFilter.defaultProps = {
  onResetFilter: () => {}
};

export default SubAccountListFilter;
