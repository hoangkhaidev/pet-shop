import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
// import { useTranslation } from "react-i18next";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
// import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import useFetchData from "src/utils/hooks/useFetchData";
// import useRouter from "src/utils/hooks/useRouter";
// import { FormattedNumberInputCaptcha } from "../shared/InputField/InputFieldNumber";

const status = [
  {id: 0, value: "all", label: "All"},
  {id: 1, value: "enable", label: "Enable"},
  {id: 2, value: "disable", label: "Disable"},
];
const jackpot = [
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

  const { dataResponse: dataBrand} = useFetchData("/api/brand");
  const { dataResponse: dataGame} = useFetchData("/api/games");
  
  const [brandData, setBrandData] = useState([]);
  const [gameTypeData, setGameTypeData] = useState([]);
  const [gameNameData, setGameNameData] = useState([]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brand_id: "all",
      game_type: "all",
      game_name: "",
      jackpot: "all",
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
  }, [dataBrand, setBrandData]);

  const onSubmit = async (data) => {
    const form = {
      ...data,
      game_type: data.game_type === 'all' ? '' : data.game_type,
      brand_id: data.brand_id === 'all' ? 0 : Number(data.brand_id),
      status: data.status === 'enable' ? true : data.status === 'disable' ? false : data.status,
    };
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      brand_id: "all",
      game_name: "",
      game_type: "all",
      status: "all",
      jackpot: "all",
    });
    setObjFilter({
      brand_id: 0,
      game_name: "",
      game_type: "",
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
              <SelectField
                control={control}
                namefileld="jackpot"
                id="jackpot"
                label="Jackpot status"
                fullWidth={false}
                options={jackpot}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                namefileld="brand_id"
                id="brand_id"
                label="Brand"
                fullWidth={false}
                options={brandData}
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