/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
import { bool, string, func, any } from "prop-types";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-daterangepicker/daterangepicker.css';

const DateRangePickerLogs = ({ handleCallback, format }) => {

  const handleApply = (event, picker) => {
    picker.element.val(
      picker.startDate.format('DD/MM/YYYY') +
        ' - ' +
        picker.endDate.format('DD/MM/YYYY')
    );
  };
  const handleCancel = (event, picker) => {
    picker.element.val('');
  };

  return (
    <div style={{ position: 'relative', paddingBottom: '18px' }}>
      <DateRangePicker
        className={'itemA'}
        initialSettings={{
          autoUpdateInput: false,
          timePicker: true,
          locale: {
            format,
          },
        }}
        onApply={handleApply}
        onCancel={handleCancel}
        onCallback={handleCallback}
      >
        <input style={{ padding: '17px', width: '100%', border: '1px solid #c0c0c0', borderRadius: '12px' }} type="text" className="form-control dater-picker-input" />
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

DateRangePickerLogs.propTypes = {
  timePicker: bool,
  handleCallback: func,
  format: string,
  abcRef: any,
};

DateRangePickerLogs.defaultProps = {
  timePicker: false,
  handleCallback: () => {},
  format: "DD/MM/YYYY HH:mm:ss"
};

export default DateRangePickerLogs;
