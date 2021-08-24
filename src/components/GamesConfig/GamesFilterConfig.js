import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import useFetchData from "src/utils/hooks/useFetchData";
import { useSelector } from "react-redux";
import cloneDeep from "lodash.clonedeep";
import api from "src/utils/api";
import get from 'lodash/get';
import { SORT_FIELD, SORT_ODER } from "src/constants";

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
  // const { t } = useTranslation();
  const classes = useStyles();
  const roleUser = useSelector((state) => state.roleUser);

  // const { dataResponse: dataBrand} = useFetchData("/api/brand/public_list");
  const { dataResponse: dataGame} = useFetchData("/api/games");
  
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const [gameTypeData, setGameTypeData] = useState([]);
  const [gameNameData, setGameNameData] = useState([]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brand_id: "all",
      game_type: "all",
      game_name: "",
      sort_field: "game_name",
      sort_order: "asc",
      status: "all"
    }
  });

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameType;
    newGameType = dataGame.game_type_list;
    if (!newGameType) return;
    if (newGameType.length <= 0) return;
    newGameType.map((data) => {
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
    let mapData = [];
    let newGameName;
    newGameName = dataGame?.games;
    if (!newGameName) return;
    if (newGameName.length <= 0) return;
    newGameName.map((data) => {
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
    newBrand.forEach(data => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleUser]);

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  // useEffect(() => {
  //   console.log(brandData)
  // }, [brandData]);


  const onSubmit = async (data) => {
    const form = {
      ...data,
      game_type: data.game_type === 'all' ? '' : data.game_type,
      brand_id: data.brand_id === 'all' ? 0 : Number(data.brand_id),
      status: data.status,
    };
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      brand_id: "all",
      game_name: "",
      game_type: "all",
      sort_field: "game_name",
      sort_order: "asc",
      status: "all",
      jackpot: "all",
    });
    setObjFilter({
      brand_id: 0,
      game_name: "",
      game_type: "",
      sort_field: "game_name",
      sort_order: "asc",
      status: "all",
      page: 1,
      page_size: 30,
    });
  }

  return (
    <>
      <ContentCardPage>
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
              <SelectField
                control={control}
                namefileld="status"
                label="Game status"
                id="status"
                fullWidth={false}
                options={status}
              />
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
              {/* <SelectField
                control={control}
                namefileld="jackpot"
                id="jackpot"
                label="Jackpot status"
                fullWidth={false}
                options={jackpot}
              /> */}
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                selectDisabled= {roleUser.account_type === 'brand' ? true : false}
                control={control}
                namefileld="brand_id"
                id="brand_id"
                label="Brand"
                fullWidth={false}
                options={brandData}
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
                options={SORT_FIELD}
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
      </ContentCardPage>
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
