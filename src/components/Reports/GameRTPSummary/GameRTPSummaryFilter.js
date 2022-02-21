import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import { FormControl, FormLabel, makeStyles } from "@material-ui/core";
import cloneDeep from 'lodash/cloneDeep';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import useFetchData from "src/utils/hooks/useFetchData";
import SelectFieldMutipleCustom from "src/components/shared/InputField/SelectFieldMutipleCustom";

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
    defaultValues: {
      option: "day",
    }
  });

  const [gameMultiple, setGameMultiple] = useState(['all']);
  const [productMultiple, setProductMultiple] = useState(['all']);

  const [dateRange, setDateRange] = useState({
    start: moment().startOf('month').format("DD/MM/YYYY"),
    end: moment().endOf('month').format("DD/MM/YYYY")
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
    let checkBrand = gameMultiple?.findIndex(item => (item === 'all')) > -1;
    let checkProduct = productMultiple?.findIndex(item => (item === 'all')) > -1;
    const form = {
      ...data,
      games: checkBrand ? [] : gameMultiple,
      product_ids: checkProduct ? [] : productMultiple,
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      games: "all",
      product_ids: "all",
    });
    setDateRange({
      start: moment().startOf('month').format("DD/MM/YYYY"),
      end: moment().endOf('month').format("DD/MM/YYYY")
    });
    setObjFilter({
      games: [],
      product_ids: [],
      from_date: moment().startOf('month').format("DD/MM/YYYY"),
      to_date: moment().endOf('month').format("DD/MM/YYYY"),
      option: "day",
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
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.dateRangeInput} item xs={12} xl={4} md={4}>
              <FormControl style={{ width: '100%' }}>
                <FormLabel style={{ paddingTop: '24px' }}>
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
                    id="game_name"
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
      </ContentCardPage>
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
