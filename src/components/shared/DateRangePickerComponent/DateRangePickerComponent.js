/* eslint-disable arrow-body-style */
import { bool, string, func } from "prop-types";
import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

const DateRangePickerComponent = ({
  timePicker, startDate, endDate,
  handleCallback, format
}) => {
  return (
    <DateRangePicker
      initialSettings={{
        startDate,
        endDate,
        timePicker,
        locale: {
          format
        }
      }}
      onCallback={handleCallback}
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
};

DateRangePickerComponent.defaultProps = {
  timePicker: false,
  handleCallback: () => {},
  format: "DD/MM/YYYY HH:mm:ss"
};

export default DateRangePickerComponent;
