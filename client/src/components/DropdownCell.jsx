
import PropTypes from "prop-types";

function DropdownCell({ options, value, onChange }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Define PropTypes for validation
DropdownCell.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired, // Must be an array of strings
  value: PropTypes.string.isRequired, // Must be a string
  onChange: PropTypes.func.isRequired, // Must be a function
};

export default DropdownCell;
