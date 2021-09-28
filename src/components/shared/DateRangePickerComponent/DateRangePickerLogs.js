/* eslint-disable arrow-body-style */
import { bool, string, func, any } from "prop-types";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

const DateRangePickerLogs = ({ handleCallback, format }) => {
  // useEffect(() => {
  //   console.log(startDate, endDate);
  // }, [startDate, endDate]);

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
    <div style={{ position: 'relative' }}>
      <DateRangePicker
        className={'itemA'}
        style={{paddingTop: "32px !important"}}
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
