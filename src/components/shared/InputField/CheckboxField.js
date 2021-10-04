import { string, bool, func } from "prop-types";
import { Controller } from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxField = ({
  control, onChange, checked, label, value
}) => (
  <Controller
    name="Checkbox"
    control={control}
    render={() => (
      <FormControlLabel
        control={(
          <Checkbox
            checked={checked}
            onChange={onChange}
            value={value}
          />
        )}
        label={label}
      />
    )}
  />
);

CheckboxField.propTypes = {
  checked: bool,
  label: string.isRequired,
  onChange: func
};

CheckboxField.defaultProps = {
  checked: false,
  onChange: () => {}
};

export default CheckboxField;
