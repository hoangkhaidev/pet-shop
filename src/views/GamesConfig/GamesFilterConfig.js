/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { func } from "prop-types";
import { useSelector } from "react-redux";
import get from 'lodash/get';
import { makeStyles } from "@mui/styles";
import useFetchData from "utils/hooks/useFetchData";
import { cloneDeep } from "lodash";
import api from "utils/api";
import MainCard from "ui-component/cards/MainCard";
import { Grid } from "@mui/material";
import SelectField from "views/InputField/SelectField";
import SelectFieldMultiple from "views/InputField/SelectFieldMutiple";
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

const SORT_FIELD = [
  {
    id: 1,
    value: "game_name",
    label: "Game Name"
  },
  {
    id: 2,
    value: "brand_name",
    label: "Brand"
  }
];

const SORT_FIELD_ADMIN = [
  {
    id: 1,
    value: "game_name",
    label: "Game Name"
  },
];

const activation = [
  {id: 0, value: "all", label: "All"},
  {id: 1, value: "enable", label: "Active"},
  {id: 2, value: "disable", label: "Inactive"},
];

const status = [
  {id: 0, value: "all", label: "All"},
  {id: 1, value: "enable", label: "Enable"},
  {id: 2, value: "disable", label: "Disable"},
];

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  }
}));

const GamesFilterConfig = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  const classes = useStyles();
  const roleUser = useSelector((state) => state.roleUser);

  const { dataResponse: dataGame} = useFetchData("/api/games");
  
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const [brandMultiple, setBrandMultiple] = useState(['all']);

  const [gameTypeData, setGameTypeData] = useState([]);
  const [gameNameData, setGameNameData] = useState([]);

  let defaultValuesInit = {};

  if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
    defaultValuesInit = {
      game_type: "all",
      game_name: "all",
      sort_field: "game_name",
      sort_order: "asc",
      game_activation: "all"
    };
  } else {
    defaultValuesInit = {
      game_type: "all",
      game_name: "all",
      sort_field: "game_name",
      sort_order: "asc",
      status: "all",
      brand_ids: "all",
    };
  }

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValuesInit
  });

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameType = cloneDeep(dataGame?.game_type_list);
    newGameType?.map((data) => {
      let optionData = {
        id: data,
        value: data,
        label: data,
      };
      mapData.push(optionData);
      return data;
    });
    setGameTypeData([...mapData]);
  }, [dataGame, setGameTypeData]);

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameName = cloneDeep(dataGame?.games);
    newGameName?.map((data) => {
      let optionData = {
        id: data.game_name,
        value: data.game_name,
        label: data.game_name,
      };
      mapData.push(optionData);
      return data;
    });
    setGameNameData([...mapData]);
  }, [dataGame, setGameNameData]);

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newBrand = cloneDeep(brandsData);
    newBrand?.forEach(data => {
      let optionData = {
        id: data.brand_id,
        value: data.brand_id,
        label: data.brand_name,
      };
      mapData.push(optionData)
    });
    setBrandData([...mapData]);
  }, [brandsData, setBrandData]);

  useEffect(() => {
    if (roleUser.account_type !== 'brand') {
      onDataBrand();
    }
  }, [roleUser]);

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response);
    }
  };

  const onSubmit = async (data) => {

    let form = {};

    if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
      form = {
        ...data,
        game_type: data.game_type === 'all' ? '' : data.game_type,
        game_name: data.game_name === 'all' ? '' : data.game_name,
        game_activation: data.game_activation,
        page: 1,
        page_size: 30,
      };
    } else {
      let checkBrand = brandMultiple?.findIndex(item => (item === 'all')) > -1;
      form = {
        ...data,
        game_type: data.game_type === 'all' ? '' : data.game_type,
        game_name: data.game_name === 'all' ? '' : data.game_name,
        brand_ids: checkBrand ? [] : brandMultiple,
        status: data.status,
        page: 1,
        page_size: 30,
      };
    }

    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      game_name: "all",
      game_type: "all",
      sort_field: "game_name",
      sort_order: "asc",
      status: "all",
      game_activation: "all",
    });

    if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
      setObjFilter({
        game_name: "",
        game_type: "",
        sort_field: "game_name",
        sort_order: "asc",
        game_activation: "",
        page: 1,
        page_size: 30,
      });
    } else {
      setObjFilter({
        brand_ids: [],
        game_name: "",
        game_type: "",
        sort_field: "game_name",
        sort_order: "asc",
        status: "all",
        page: 1,
        page_size: 30,
      });
      setBrandMultiple(['all']);
    }
  }

  return (
    <>
      <MainCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                namefileld="game_type"
                label="Game type"
                id="game_type"
                fullWidth={false}
                options={gameTypeData}
              />
              {
                roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' ? (
                  <SelectField
                    control={control}
                    namefileld="game_activation"
                    label="Game Activation"
                    id="game_activation"
                    fullWidth={false}
                    options={activation}
                  />
                ) : (
                  <SelectField
                    control={control}
                    namefileld="status"
                    label="Game status"
                    id="status"
                    fullWidth={false}
                    options={status}
                  />
                )
              }
              
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                namefileld="game_name"
                label="Game name"
                id="game_name"
                fullWidth={false}
                options={gameNameData}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectFieldMultiple
                selectDisabled= {roleUser.account_type === 'operator' || roleUser.account_type === 'operatorsub' ? false : true}
                options={brandData} 
                label={'Brand'} 
                id={'brand_ids'}
                setBrandMultiple={setBrandMultiple}
                brandMultiple={brandMultiple}
                defaultValue={'all'}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                namefileld="sort_field"
                label="Sort Field"
                id="sort_field"
                fullWidth={false}
                options={roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' ? SORT_FIELD_ADMIN : SORT_FIELD}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
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
            <SubmitButton text={'Search'} />
            <ResetButton onAction={onResetFilterPlayer} />
          </ButtonGroup>
        </form>
      </MainCard>
    </>
  );
};

GamesFilterConfig.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

GamesFilterConfig.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default GamesFilterConfig;
