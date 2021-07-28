/* eslint-disable arrow-body-style */
import { bool, string, func, any } from "prop-types";
import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
// import { useEffect } from "react";

const DateRangePickerComponent = ({
  timePicker, startDate, endDate,
  handleCallback, format, dateRangeRef,
}) => {
  // useEffect(() => {
  //   console.log(startDate, endDate);
  // }, [startDate, endDate]);
  return (
    <DateRangePicker
      className={'itemA'}
      style={{paddingTop: "32px !important"}}
      initialSettings={{
        startDate,
        endDate,
        timePicker: true,
        locale: {
          format
        }
      }}
      onCallback={handleCallback}
      ref={dateRangeRef}
    >
      <input type="text" className="form-control dater-picker-input" />
    </DateRangePicker>
  );
};

DateRangePickerComponent.propTypes = {
  timePicker: bool,
  startDate: string.isRequired,
  endDate: string.isRequired,
  handleCallback: func,
  format: string,
  abcRef: any,
};

DateRangePickerComponent.defaultProps = {
  timePicker: false,
  handleCallback: () => {},
  format: "DD/MM/YYYY HH:mm:ss"
};

export default DateRangePickerComponent;
