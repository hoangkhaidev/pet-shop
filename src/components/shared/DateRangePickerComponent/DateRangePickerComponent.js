/* eslint-disable arrow-body-style */
import { bool, string, func, any } from "prop-types";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

const DateRangePickerComponent = ({
  timePicker, startDate, endDate,
  handleCallback, format, dateRangeRef, maxDate, minDate, showtime24
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <DateRangePicker
        className={'itemA'}
        style={{paddingTop: "32px !important"}}
        initialSettings={{
          chosenLabel:'test',
          startDate,
          endDate,
          timePicker: showtime24,
          timePicker24Hour: true,
          maxDate,
          minDate,
          locale: {
            format
          }
        }}
        onCallback={handleCallback}
        ref={dateRangeRef}
      >
        <input style={{ paddingRight: '30px' }} type="text" className="form-control dater-picker-input" />
      </DateRangePicker>
      <FontAwesomeIcon 
        icon={faCalendarAlt} 
        size={'1x'} 
        color={'#616367'} 
        style={{ position: 'absolute', top: '19px', right: '10px' }}
      />
    </div>
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
