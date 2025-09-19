import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './table.css';

function Table({ columns, rows }) {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="table-outer-wrapper">
      <table className="table-header">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="table-body-wrapper">
        <table className="table-body">
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}
                  className={`accordion-row ${expandedRow === idx ? 'expanded' : ''}`}
                  onClick={() => isMobile && toggleRow(idx)}
              >
                {isMobile ? (
                  // Mobile summary view
                  <>
                  <td className="collapsed-preview">
                    {row.name} ({row.gender}) – Invited by {row.invitedBy}
                  </td>
                  {columns.map((col) =>
                    !['name', 'gender', 'invitedBy'].includes(col.key) ? (
                    <td key={col.key} data-label={col.label}>
                      <span>{row[col.key]}</span>
                    </td>
                    ) : null
                  )}
                </>
                ) : (
                  // Full desktop view
                  columns.map((col) => (
                  <td key={col.key} data-label={col.label}>
                   {row[col.key]}
                  </td>
                  ))
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
