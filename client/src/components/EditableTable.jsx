import  { useState } from "react";
import DropdownCell from "./DropdownCell";

const EditableTable = () => {
  const [ageGroups] = useState(["Teen", "Young Adult", "Adult", "Senior"]);
  const [customStatuses] = useState(["CL", "C1", "C2", "C3", "DC", "D"]);

  // ✅ Initial table data
  const [data, setData] = useState([
    { id: 1, leader: "Alice", member: "feaffefakopfafafeafffeafkopokofeafeafeafae", ageGroup: "18-25", jan2025: "Active", mar2025: "Active", may2025: "Inactive", jul2025: "Active", sep2025: "Active", nov2025: "Inactive", dec2025: "Active" },
    { id: 2, leader: "Bob", member: "Jane", ageGroup: "26-35", jan2025: "Inactive", mar2025: "Inactive", may2025: "Active", jul2025: "Inactive", sep2025: "Active", nov2025: "Active", dec2025: "Inactive" },
    { id: 3, leader: "Charlie", member: "Mike", ageGroup: "18-25", jan2025: "Active", mar2025: "Active", may2025: "Inactive", jul2025: "Active", sep2025: "Inactive", nov2025: "Active", dec2025: "Active" },
    { id: 4, leader: "Diana", member: "Lisa", ageGroup: "36-45", jan2025: "Active", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Inactive", nov2025: "Inactive", dec2025: "Active" },
    { id: 5, leader: "Eve", member: "Sam", ageGroup: "26-35", jan2025: "Inactive", mar2025: "Active", may2025: "Inactive", jul2025: "Inactive", sep2025: "Active", nov2025: "Active", dec2025: "Inactive" },
    { id: 6, leader: "Frank", member: "Paul", ageGroup: "18-25", jan2025: "Active", mar2025: "Active", may2025: "Active", jul2025: "Inactive", sep2025: "Active", nov2025: "Inactive", dec2025: "Active" },
    { id: 7, leader: "Grace", member: "Megan", ageGroup: "26-35", jan2025: "Active", mar2025: "Inactive", may2025: "Inactive", jul2025: "Active", sep2025: "Active", nov2025: "Active", dec2025: "Inactive" },
    { id: 8, leader: "Hank", member: "Kyle", ageGroup: "36-45", jan2025: "Inactive", mar2025: "Active", may2025: "Inactive", jul2025: "Active", sep2025: "Active", nov2025: "Inactive", dec2025: "Active" },
    { id: 9, leader: "Ivy", member: "Nina", ageGroup: "18-25", jan2025: "Active", mar2025: "Active", may2025: "Inactive", jul2025: "Inactive", sep2025: "Active", nov2025: "Active", dec2025: "Active" },
    { id: 10, leader: "Jack", member: "Tom", ageGroup: "26-35", jan2025: "Inactive", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Active", nov2025: "Inactive", dec2025: "Inactive" },
    { id: 11, leader: "Kate", member: "Emma", ageGroup: "36-45", jan2025: "Active", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Inactive", nov2025: "Active", dec2025: "Inactive" },
    { id: 12, leader: "Leo", member: "Oscar", ageGroup: "18-25", jan2025: "Active", mar2025: "Active", may2025: "Inactive", jul2025: "Inactive", sep2025: "Active", nov2025: "Active", dec2025: "Active" },
    { id: 13, leader: "Mia", member: "Sophia", ageGroup: "26-35", jan2025: "Inactive", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Active", nov2025: "Inactive", dec2025: "Active" },
    { id: 14, leader: "Nathan", member: "Lucas", ageGroup: "36-45", jan2025: "Active", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Inactive", nov2025: "Active", dec2025: "Inactive" },
    { id: 15, leader: "Olivia", member: "Ella", ageGroup: "18-25", jan2025: "Active", mar2025: "Active", may2025: "Inactive", jul2025: "Inactive", sep2025: "Active", nov2025: "Active", dec2025: "Active" },
    { id: 16, leader: "Patrick", member: "Ryan", ageGroup: "26-35", jan2025: "Inactive", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Active", nov2025: "Inactive", dec2025: "Inactive" },
    { id: 17, leader: "Quinn", member: "Zoe", ageGroup: "36-45", jan2025: "Active", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Inactive", nov2025: "Active", dec2025: "Inactive" },
    { id: 18, leader: "Rachel", member: "Liam", ageGroup: "18-25", jan2025: "Active", mar2025: "Active", may2025: "Inactive", jul2025: "Inactive", sep2025: "Active", nov2025: "Active", dec2025: "Active" },
    { id: 19, leader: "Sam", member: "Tyler", ageGroup: "26-35", jan2025: "Inactive", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Active", nov2025: "Inactive", dec2025: "Active" },
    { id: 20, leader: "Tina", member: "Victor", ageGroup: "36-45", jan2025: "Active", mar2025: "Inactive", may2025: "Active", jul2025: "Active", sep2025: "Inactive", nov2025: "Active", dec2025: "Inactive" }
  ]);

  const handleDropdownChange = (rowIndex, key, newValue) => {
    const newData = [...data];
    newData[rowIndex][key] = newValue;
    setData(newData);
  };

  // ✅ Handle Input Change
  const handleChange = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table>
        <thead>
  <tr>
    <th>LIFEGROUP LEADER</th>
    <th>MEMBER</th>
    <th>AGE GROUP</th>
    <th className="sticky-month">JAN 2025</th>
    <th className="sticky-month">MAR 2025</th>
    <th className="sticky-month">MAY 2025</th>
    <th className="sticky-month">JUL 2025</th>
    <th className="sticky-month">SEP 2025</th>
    <th className="sticky-month">NOV 2025</th>
    <th className="sticky-month">DEC 2025</th>
    <th className="sticky-month">REMARKS</th>
  </tr>
</thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className={`fixed-col col-0`}>
                  <input
                    type="text"
                    value={row.leader || ""}
                    onChange={(e) => handleChange(rowIndex, "leader", e.target.value)}
                  />
                </td>
                <td className={`fixed-col col-1`}>
                  <input
                    type="text"
                    value={row.member || ""}
                    onChange={(e) => handleChange(rowIndex, "member", e.target.value)}
                  />
                </td>
                <td className="fixed-col col-2">
                  <DropdownCell
                  options={ageGroups}
                  value={row.ageGroup}
                  onChange={(value) => handleDropdownChange(rowIndex, "ageGroup", value)}
                  />
                </td>
                <td className={`fixed-col col-3`}>
                  {/* <input type="text" value={row.jan2025 || ""} onChange={(e) => handleChange(rowIndex, "jan2025", e.target.value)} />*/}
                  <DropdownCell
                    options={customStatuses}
                    value={row.jan2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "jan2025", value)}
                  /> 
                </td>
                <td className={`fixed-col col-4`}>
                  {/* <input type="text" value={row.mar2025 || ""} onChange={(e) => handleChange(rowIndex, "mar2025", e.target.value)} />*/}
                  <DropdownCell
                    options={customStatuses}
                    value={row.mar2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "mar2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-5`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.may2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "may2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-6`}>
                <DropdownCell
                    options={customStatuses}
                    value={row.jul2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "jul2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-7`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.sep2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "sep2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-8`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.nov2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "nov2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-9`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "dec2025", value)}
                  />
                </td>
                <td className={`fixed-col col-10`}>
                  <input type="text" value={row.remarks || ""} onChange={(e) => handleChange(rowIndex, "remarks", e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable;
