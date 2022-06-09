/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { FormControl } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";

export default function CalendarDateRangePicker({startDate, endDate, onChangeDateRange, loadCalendar, format, showtime24, maxDate, minDate}) {
  let startDateInit = Date(startDate).toString();
  let endDateInit = Date(endDate).toString();
  const [value, setValue] = useState([startDateInit, endDateInit]);

  useEffect(() => {
    setValue([startDateInit, endDateInit]);
  }, [loadCalendar]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DateRangePicker
          calendars={2}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            onChangeDateRange(newValue[0], newValue[1])
          }}
          inputFormat={format}
          maxDate={maxDate}
          minDate={minDate}
          renderInput={(startProps, endProps) => (
            <FormControl
                fullWidth
                sx={{
                    marginTop: '8px',
                }}
            >
                <TextField 
                    {...startProps} 
                    label='Form' 
                    sx={{
                        marginBottom: '27px',
                        input: {
                            padding: '21px',
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <FontAwesomeIcon 
                                icon={faCalendarAlt} 
                                size={'1x'} 
                                color={'#616367'} 
                                style={{ pointerEvents: 'none' }}
                            />
                        )
                    }}
                />
                <TextField 
                    {...endProps} 
                    label='To' 
                    sx={{
                        input: {
                            padding: '21px',
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <FontAwesomeIcon 
                                icon={faCalendarAlt} 
                                size={'1x'} 
                                color={'#616367'} 
                                style={{ pointerEvents: 'none' }}
                            />
                        )
                    }}
                />
            </FormControl>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
