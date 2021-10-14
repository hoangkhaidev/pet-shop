import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from "@material-ui/core";
import cloneDeep from 'lodash/cloneDeep';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import SelectField from "src/components/shared/InputField/SelectField";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import useFetchData from "src/utils/hooks/useFetchData";
import { useSelector } from "react-redux";
import api from "src/utils/api";
import get from 'lodash/get';
import InputField from "src/components/shared/InputField/InputField";
import InputNumberValue from "./InputNumberValue";
import SelectFieldMutiple from "src/components/shared/InputField/SelectFieldMutiple";
import InputNumber from "src/components/shared/InputField/InputNumber";
import useRouter from "src/utils/hooks/useRouter";

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  }
}));

const searchByOption = [
  {id: "", value: "", label: "Default"},
  {id: "bet_native", value: "bet_native", label: "Bets"},
  {id: "win_native", value: "win_native", label: "Wins"}
];

const PlayersBusinessSummaryFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  const roleUser = useSelector((state) => state.roleUser);
  const router = useRouter();

  let playerRouter = '';
  if (router?.query.player_id && Number(router?.query.player_id) !== 0) {
    playerRouter = router?.query.player_id;
  }

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      option: router?.query?.option ? router?.query?.option : 'day',
      player_id: playerRouter,
      nick_name: router?.query?.nick_name ? router?.query?.nick_name : '',
      game_type: router?.query?.game_type ? router?.query?.game_type : 'all',
      game_name: router?.query?.game_name ? router?.query?.game_name : 'all',
      search_by: router?.query?.search_by ? router?.query?.search_by : '',
      search_by_option: router?.query?.search_by_option ? router?.query?.search_by_option : '',
      value: router?.query?.value ? router?.query?.value : '0',
    }
  });

  let brand_router = [];

  if (router?.query.brand_ids) {
    brand_router = (router?.query?.brand_ids || []).map((item) => {
      return Number(item);
    });
  };

  let brandStart = router?.query.brand_ids ? brand_router : ['all'];

  const [brandMultiple, setBrandMultiple] = useState(brandStart);

  let from_dateFilter = moment().format("DD/MM/YYYY");
  if (router?.query?.from_date) {
    from_dateFilter = router?.query?.from_date;
  }
  let to_dateFilter = moment().format("DD/MM/YYYY");
  if (router?.query?.to_date) {
    to_dateFilter = router?.query?.to_date;
  }
  const [dateRange, setDateRange] = useState({
    start: from_dateFilter,
    end: to_dateFilter
  });

  const dateRangeRef = useRef(null);
  const classes = useStyles();

  const { dataResponse: dataGame} = useFetchData("/api/games");
  
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [gameTypeData, setGameTypeData] = useState([]);
  const [gameNameData, setGameNameData] = useState([]);
  
  let optionFilter = 'day';
  if (router?.query?.option) {
    optionFilter = router?.query?.option;
  }

  let searchByFilter = '';
  if (router?.query?.search_by_option) {
    searchByFilter = router?.query?.search_by_option;
  }

  const [radio, setRadio] = useState(optionFilter);
  const [radioSearchBy, setRadioSearchBy] = useState(searchByFilter);

  const handleChange = (event) => {
    setRadio(event.target.value);
  };

  const handleChangeSearchBy = (event) => {
    setRadioSearchBy(event.target.value);
  };

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
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
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newBrand = cloneDeep(brandsData);

    (newBrand || []).forEach(data => {
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
  }, [roleUser]);

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response);
    }
  };

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY"),
      end: moment(endDate).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    let checkBrand = brandMultiple?.findIndex(item => (item === 'all')) > -1;
    const form = {
      ...data,
      brand_ids: checkBrand ? [] : brandMultiple,
      game_type: data.game_type === 'all' ? '' : data.game_type,
      game_name: data.game_name === 'all' ? '' : data.game_name,
      player_id: data.player_id ? Number(data.player_id) : 0,
      value: String(data.value),
      option: radio,
      search_by_option: radioSearchBy ? radioSearchBy : '',
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      option: "day",
      player_id: "",
      nick_name: "",
      game_type: "all",
      game_name: "all",
      search_by: "",
      search_by_option: "",
      value: "0",
    });
    setDateRange({
      start: moment().format("DD/MM/YYYY"),
      end: moment().format("DD/MM/YYYY")
    });
    setObjFilter({
      brand_ids: [],
      from_date: moment().format("DD/MM/YYYY"),
      to_date: moment().format("DD/MM/YYYY"),
      option: "day",
      player_id: 0,
      sort_field: "period",
      sort_order: "desc",
      nick_name: "",
      game_type: "",
      game_name: "",
      search_by: "",
      search_by_option: "",
      value: "0",
      page: 1,
      page_size: 30,
    });
    setRadio('day');
    setRadioSearchBy('');
    setBrandMultiple(['all']);
   
  }

  useEffect(() => {
    dateRangeRef.current.setStartDate(dateRange.start);
    dateRangeRef.current.setEndDate(dateRange.end);
  }, [dateRange]);

  return (
    <>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.dateRangeInput} item xs={12} xl={3} md={3}>
              <FormControl style={{ width: '100%' }}>
                <FormLabel style={{ paddingTop: '24px' }}>
                </FormLabel>
                <DateRangePickerComponent
                  control={control}
                  handleCallback={onChangeDateRange}
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  maxDate={moment().format("DD/MM/YYYY 23:59")}
                  minDate={moment().subtract(30, 'days').format("DD/MM/YYYY 00:00")}
                  dateRangeRef={dateRangeRef}
                  format="DD/MM/YYYY"
                />
              </FormControl>
              <RadioGroup aria-label="gender" name="option" value={radio} onChange={handleChange}>
                <div style={{ display: 'flex', paddingTop: '25px', paddingLeft: '15px' }}>
                  <div>
                    <FormControlLabel value="day" control={<Radio />} label="Total by Day" />
                    <FormControlLabel value="month" control={<Radio />} label="Total by Month" />
                  </div>
                  <div>
                    <FormControlLabel value="week" control={<Radio />} label="Total by Week" />
                    <FormControlLabel value="year" control={<Radio />} label="Total by Year" />
                  </div>
                </div>
              </RadioGroup>
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
              <InputNumber
                namefileld="player_id"
                label="Player ID"
                id="player_id"
                control={control}
              />
              <SelectField
                control={control}
                namefileld="game_type"
                id="game_type"
                label="Game Type"
                fullWidth={false}
                options={gameTypeData}
                defaultValue="all"
              />
              <SelectField
                control={control}
                namefileld="search_by"
                id="search_by"
                label="Search by"
                fullWidth={false}
                options={searchByOption}
                defaultValue=""
              />
              <InputNumberValue
                control={control}
                namefileld="value"
                label="Value"
                id="value"
                fullWidth={false}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <InputField
                control={control}
                namefileld="nick_name"
                type="text"
                label="Nickname"
                id="nick_name"
                fullWidth={false}
              />
              <SelectField
                control={control}
                namefileld="game_name"
                id="game_name"
                label="Game Name"
                fullWidth={false}
                options={gameNameData}
              />
              <RadioGroup aria-label="gender" name="search_by_option" value={radioSearchBy} onChange={handleChangeSearchBy}>
                <div style={{ display: 'grid', paddingLeft: '30px' }}>
                  <FormControlLabel value="<" control={<Radio />} label="Less than" />
                  <FormControlLabel value=">" control={<Radio />} label="More or equal" />
                </div>
              </RadioGroup>
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
              <SelectFieldMutiple
                selectDisabled= {roleUser.account_type === 'brand' ? true : false}
                options={brandData} 
                label={'Brand'} 
                id={'brand_ids'}
                setBrandMultiple={setBrandMultiple}
                brandMultiple={brandMultiple}
                defaultValue={'all'}
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

PlayersBusinessSummaryFilter.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

PlayersBusinessSummaryFilter.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default PlayersBusinessSummaryFilter;
