/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { func } from "prop-types";
import { makeStyles } from "@mui/styles";
import useFetchData from "utils/hooks/useFetchData";
import MainCard from "ui-component/cards/MainCard";
import { FormLabel, Grid } from "@mui/material";
import { FormControl } from "@mui/material";
import DateRangePickerComponent from "views/DateRangePickerComponent/DateRangePickerComponent";
import SelectFieldMutipleCustom from "views/InputField/SelectFieldMutipleCustomer";
import ButtonGroup, { ResetButton, SubmitButton } from "views/Button/Button";

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  }
}));

const GameRTPSummaryFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {}
  });

  const [gameMultiple, setGameMultiple] = useState(['all']);
  const [productMultiple, setProductMultiple] = useState(['all']);

  const [dateRange, setDateRange] = useState({
    start: moment().subtract(1, 'year').format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });
  
  const dateRangeRef = useRef(null);
  const classes = useStyles();

  const { dataResponse: dataProduct } = useFetchData('/api/product');
  const { dataResponse: dataGame} = useFetchData("/api/games");
  
  const [productData, setProductData] = useState([]);
  const [gameNameData, setGameNameData] = useState([]);

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newProducts = cloneDeep(dataProduct);
    (newProducts || []).forEach((data, index) => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.name,
      };
      mapData.push(optionData)
    });
    setProductData([...mapData]);
  }, [dataProduct, setProductData]);

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameName = cloneDeep(dataGame?.games)
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
  
  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY"),
      end: moment(endDate).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    let checkGames = gameMultiple?.findIndex(item => (item === 'all')) > -1;
    let checkProduct = productMultiple?.findIndex(item => (item === 'all')) > -1;
    const form = {
      ...data,
      game_names: checkGames ? [] : gameMultiple,
      product_ids: checkProduct ? [] : productMultiple,
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      game_names: "all",
      product_ids: "all",
    });
    setDateRange({
      start: moment().subtract(1, 'year').format("DD/MM/YYYY"),
      end: moment().format("DD/MM/YYYY")
    });
    setObjFilter({
      game_names: [],
      product_ids: [],
      from_date: moment().subtract(1, 'year').format("DD/MM/YYYY"),
      to_date: moment().format("DD/MM/YYYY"),
    });
    setGameMultiple(['all']);
    setProductMultiple(['all']);
  }

  useEffect(() => {
    dateRangeRef.current.setStartDate(dateRange.start);
    dateRangeRef.current.setEndDate(dateRange.end);
  }, [dateRange]);

  return (
    <>
      <MainCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.dateRangeInput} item xs={12} xl={4} md={4} sx={{mt: '7px'}}>
              <FormControl style={{ width: '100%' }}>
                <FormLabel style={{ paddingTop: '32px' }}>
                </FormLabel>
                <DateRangePickerComponent
                  control={control}
                  handleCallback={onChangeDateRange}
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  dateRangeRef={dateRangeRef}
                  format="DD/MM/YYYY"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} xl={4} md={4}>
              <SelectFieldMutipleCustom
                options={productData}
                label={'Product'} 
                id={'product_ids'}
                setStateMultiple={setProductMultiple}
                stateMultiple={productMultiple}
                defaultValue={'all'}
              />
            </Grid>
            <Grid item xs={12} xl={4} md={4}>
                <SelectFieldMutipleCustom
                    setStateMultiple={setGameMultiple}
                    stateMultiple={gameMultiple}
                    id="game_names"
                    label="Games"
                    fullWidth={false}
                    options={gameNameData}
                    defaultValue={'all'}
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

GameRTPSummaryFilter.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

GameRTPSummaryFilter.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default GameRTPSummaryFilter;
