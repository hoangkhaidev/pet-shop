import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TableBetScale from 'src/components/shared/TableComponent/TableBetScale';
import { Button, FormLabel, Input } from '@material-ui/core';
import ButtonGroup, { SubmitButton, } from 'src/components/shared/Button/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import validate from 'validate.js';
import api from 'src/utils/api';
import { toast } from 'react-toastify';
import get from "lodash/get";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    marginLeft: '10px',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textAlign: 'left',
  },
  w20: {
    width: '20%',
    textAlign: 'right',
  },
  w40: {
    width: '40%',
    textAlign: 'right',
  },
  w60: {
    width: '60%',
    marginLeft: '10px',
  },
  w80: {
    width: '80%',
    marginLeft: '10px',
  },
  tableConfiguration: {
    display: 'flex',
    paddingTop: '20px',
    alignItems: 'center',
  },
  inputTotal: {
    textAlign: 'right !important'
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
  }
}));

const schema = {
  total_min: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      greaterThanOrEqualTo: 0,
    }
  },
  total_max: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      greaterThanOrEqualTo: 0,
    }
  },
}

export default function TabBetScale({currentData, setObjFilter, objFilter, dataDetail}) {
  // console.log(dataDetail?.bet_scale_list);
  // let betList = dataDetail?.bet_scale_list?.map((item) => {
  //   let newScale = (Math.round(item.bet_scale * 100) / 100).toFixed(2);
  //   return {
  //     bet_scale: newScale
  //   }
  // });
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const initFormState = {
    isValid: false,
    values: {
      brand_id: dataDetail?.brand_id,
      bet_scale_id: dataDetail?.id,
      default_bet_scale: dataDetail?.default_bet_scale,
      bet_scale_list: dataDetail?.bet_scale_list,
      total_min: 0,
      total_max: 0
    },
    errors: {},
    touched: {}
  };

  const [formState, setFormState] = useState(initFormState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.isValid === true) {
      let max = Number(formState.values.total_max);
      let min = Number(formState.values.total_min);
      if (min === 0 && max === 0){
        let minNew = String(min);
        let maxNew = String(max);
        let newDataForm = {
          ...formState.values,
          total_min: minNew,
          total_max: maxNew,
        }
        const response = await api.post('/api/game_config/bet_scale/update', newDataForm);
          if (get(response, "success", false)) {
            // console.log(response);
            toast.success('Update Bet Scale Success', {
              onClose: setTimeout(() => {
                  window.location.reload()
              }, 1000),   
            });
          } else {
            if (response.err === "err:form_validation_failed") {
              if (response?.data?.default_bet === "err:bet_not_found") {
                toast.warn(`${dataDetail.currency_code} default bet not found`, {
                  onClose: setTimeout(() => {
                      window.location.reload()
                  }, 0),
                }); 
              } else {
                toast.warn(`${dataDetail.currency_code} bet scale must be in range of Total MIN and Total MAX`, {
                  onClose: setTimeout(() => {
                      window.location.reload()
                  }, 0),
                });
              }
            }
          }
      } else {
        if (min >= max) {
          const errors = {
            total_max: ["Total Max should be greater than Total Min"]
          };
          setFormState((formState) => ({
            ...formState,
            isValid: false,
            errors: errors || {}
          }));
        } else {
          let minNew = String(min);
          let maxNew = String(max);
          let newDataForm = {
            ...formState.values,
            total_min: minNew,
            total_max: maxNew,
          }
          const response = await api.post('/api/game_config/bet_scale/update', newDataForm);
          if (get(response, "success", false)) {
            // console.log(response);
            toast.success('Update Bet Scale Success', {
              onClose: setTimeout(() => {
                  window.location.reload()
              }, 0),   
            });
          } else {
            // console.log(response.err)
            if (response.err === "err:form_validation_failed") {
              if (response?.data?.default_bet === "err:bet_not_found") {
                toast.warn(`${dataDetail.currency_code} default bet not found`, {
                  onClose: setTimeout(() => {
                      window.location.reload()
                  }, 0),
                }); 
              } else {
                toast.warn(`${dataDetail.currency_code} bet scale must be in range of Total MIN and Total MAX`, {
                  onClose: setTimeout(() => {
                      window.location.reload()
                  }, 0),
                });
              }
            }
            // console.log(response);
            // toast.warn('Update Bet Scale Fail');
          }
        }
      }
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setObjFilter({
      ...objFilter,
      currency_code: currentData[newValue].code
    })
  };

  const handleReset = () => {
    // setFormState(initFormState);
    window.location.reload();
  };
  
  const handleChangeInput = (event) => {
    event.persist();
    
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  useEffect(() => {
    setFormState(initFormState);
    // eslint-disable-next-line
  }, [dataDetail]);

  // useEffect(() => {
  //   console.log(formState);
  // }, [formState]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const hasError = (field) => formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root} >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {currentData.map((item, index) => (
          <Tab key={index} label={item.code} {...a11yProps(index)} />
        ))}
      </Tabs>
      {currentData.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          <form onSubmit={handleSubmit}>
            <TableBetScale 
                dataDetail={dataDetail}
                default_bet_scale={formState?.values?.default_bet_scale}
                setFormState={setFormState}
            />
            <div className={classes.tableConfiguration}>
                <span className={classes.w20}>Total bet limits:	</span> 
            </div> 
            <div className={classes.tableConfiguration}>
                <span className={classes.w40}>Total MIN: </span> 
                <span className={classes.w60}>
                    <Input 
                      id="standard-basic" 
                      type="text" 
                      onChange={handleChangeInput}
                      error={hasError('total_min')}
                      name="total_min"
                      value={formState.values.total_min}
                      className={classes.inputTotal} 
                    />  
                    <FormLabel component="legend" className={classes.checkHelperText}>
                      { hasError('total_min') ? formState.errors.total_min[0] : null }
                    </FormLabel>  
                </span> 
            </div> 
            <div className={classes.tableConfiguration}>
                <span className={classes.w40}>Total MAX: </span> 
                <span className={classes.w60}>
                    <Input 
                      id="standard-basic" 
                      type="text" 
                      onChange={handleChangeInput}
                      error={hasError('total_max')}
                      name="total_max"
                      value={formState.values.total_max}
                      className={classes.inputTotal} 
                    />
                    <FormLabel component="legend" className={classes.checkHelperText}>
                      { hasError('total_max') ? formState.errors.total_max[0] : null }
                    </FormLabel>
                </span> 
            </div> 
            <div className={classes.tableConfiguration} style={{ justifyContent: 'flex-end' }}>
                <ButtonGroup>
                    <SubmitButton 
                      text={'Save'} 
                      disabled={!formState.isValid}
                    />
                    <Button
                        startIcon={<ClearAllIcon fontSize="small" />}
                        variant="contained"
                        type="button"
                        color="secondary"
                        onClick={() => handleReset()}
                        sx={{
                          ml: 1
                        }}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </div>
          </form>
        </TabPanel>
      ))}
    </div>
  );
}