/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { bool, string, func, any } from "prop-types";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-daterangepicker/daterangepicker.css';

const DateRangePickerComponent = ({
  timePicker, startDate, endDate,
  handleCallback, format, dateRangeRef, maxDate, minDate, showtime24
}) => {
  return (
    <div style={{ position: 'relative', paddingBottom: '18px' }}>
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
        <input style={{ padding: '17px', width: '100%', border: '1px solid #c0c0c0', borderRadius: '12px' }} type="text" className="dater-picker-input" />
      </DateRangePicker>
      <FontAwesomeIcon 
        icon={faCalendarAlt} 
        size={'1x'} 
        color={'#616367'} 
        style={{ position: 'absolute', top: '18px', right: '10px', pointerEvents: 'none' }}
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
