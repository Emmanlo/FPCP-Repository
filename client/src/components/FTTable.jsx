import  { useState } from "react";
import DropdownCell from "./DropdownCell";

const FTTable = () => {
  const [ageGroups] = useState(["Teen", "Young Adult", "Adult", "Senior"]);
  const [customStatuses] = useState(["CL", "C1", "C2", "C3", "DC", "D"]);

  // ✅ Initial table data
  const [data, setData] = useState([
    { id: 1, name: "John Doe", invitedBy: "Jane Smith", consolidator: "Mike Johnson", ageGroup: "18-25", gender: "Male", firstTimerIn: "Youth Group", firstTimeAttendance: "2025-01-14", jan2025: "Attended", feb2025: "Absent", mar2025: "Attended", apr2025: "Attended", may2025: "Absent", jun2025: "Attended", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 2, name: "Maria Garcia", invitedBy: "Carlos Rivera", consolidator: "Ana Gomez", ageGroup: "26-35", gender: "Female", firstTimerIn: "Main Service", firstTimeAttendance: "2025-02-04", jan2025: "", feb2025: "Attended", mar2025: "Attended", apr2025: "Absent", may2025: "Attended", jun2025: "", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 3, name: "Samuel Lee", invitedBy: "Emily Tan", consolidator: "David Wong", ageGroup: "36-45", gender: "Male", firstTimerIn: "Men's Fellowship", firstTimeAttendance: "2025-03-10", jan2025: "", feb2025: "", mar2025: "Attended", apr2025: "Attended", may2025: "Absent", jun2025: "Attended", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 4, name: "Lisa Adams", invitedBy: "Nancy Cruz", consolidator: "James Ford", ageGroup: "18-25", gender: "Female", firstTimerIn: "Youth Group", firstTimeAttendance: "2025-01-21", jan2025: "Attended", feb2025: "Attended", mar2025: "Attended", apr2025: "", may2025: "", jun2025: "", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 5, name: "Robert King", invitedBy: "Andrew Hall", consolidator: "Michelle Dean", ageGroup: "46-60", gender: "Male", firstTimerIn: "Main Service", firstTimeAttendance: "2025-02-15", jan2025: "", feb2025: "Absent", mar2025: "Attended", apr2025: "Absent", may2025: "Attended", jun2025: "", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 6, name: "Angela White", invitedBy: "Sophie Lane", consolidator: "Daniel Kim", ageGroup: "26-35", gender: "Female", firstTimerIn: "Women’s Fellowship", firstTimeAttendance: "2025-03-01", jan2025: "", feb2025: "", mar2025: "Attended", apr2025: "Attended", may2025: "", jun2025: "", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 7, name: "Brian Smith", invitedBy: "Laura Page", consolidator: "Chris Allen", ageGroup: "36-45", gender: "Male", firstTimerIn: "Main Service", firstTimeAttendance: "2025-01-09", jan2025: "Attended", feb2025: "Attended", mar2025: "Absent", apr2025: "Attended", may2025: "", jun2025: "", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 8, name: "Olivia Johnson", invitedBy: "George Brooks", consolidator: "Ashley Burns", ageGroup: "18-25", gender: "Female", firstTimerIn: "Youth Group", firstTimeAttendance: "2025-04-05", jan2025: "", feb2025: "", mar2025: "", apr2025: "Attended", may2025: "Attended", jun2025: "", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 9, name: "Kevin Martinez", invitedBy: "Brian Gray", consolidator: "Linda West", ageGroup: "26-35", gender: "Male", firstTimerIn: "Main Service", firstTimeAttendance: "2025-02-28", jan2025: "", feb2025: "Attended", mar2025: "Attended", apr2025: "Attended", may2025: "Absent", jun2025: "", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 10, name: "Sophia Davis", invitedBy: "Rebecca Green", consolidator: "Tony Hill", ageGroup: "36-45", gender: "Female", firstTimerIn: "Women's Fellowship", firstTimeAttendance: "2025-03-17", jan2025: "", feb2025: "", mar2025: "Attended", apr2025: "Attended", may2025: "Attended", jun2025: "Attended", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" },
    { id: 11, name: "Jason Clark", invitedBy: "Diana Morris", consolidator: "Greg Scott", ageGroup: "46-60", gender: "Male", firstTimerIn: "Men's Fellowship", firstTimeAttendance: "2025-01-30", jan2025: "Absent", feb2025: "Attended", mar2025: "Attended", apr2025: "Absent", may2025: "Attended", jun2025: "Attended", jul2025: "", aug2025: "", sep2025: "", oct2025: "", nov2025: "", dec2025: "" }

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
    <th>NAME</th>
    <th>INVITED BY</th>
    <th>CONSOLIDATOR</th>
    <th className="sticky-columns">AGE GROUP</th>
    <th className="sticky-columns">GENDER</th>
    <th className="sticky-columns">FIRST-TIMER IN</th>
    <th className="sticky-columns">DATE OF FT ATTD</th>
    <th className="sticky-columns">JAN 2025</th>
    <th className="sticky-columns">FEB 2025</th>
    <th className="sticky-columns">MAR 2025</th>
    <th className="sticky-columns">APR 2025</th>
    <th className="sticky-columns">MAY 2025</th>
    <th className="sticky-columns">JUN 2025</th>
    <th className="sticky-columns">JUL 2025</th>
    <th className="sticky-columns">AUG 2025</th>
    <th className="sticky-columns">SEP 2025</th>
    <th className="sticky-columns">OCT 2025</th>
    <th className="sticky-columns">NOV 2025</th>
    <th className="sticky-columns">DEC 2025</th>
    <th className="sticky-columns">REMARKS</th>
  </tr>
</thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className={`fixed-col col-0`}>
                  <input
                    type="text"
                    value={row.name || ""}
                    onChange={(e) => handleChange(rowIndex, "name", e.target.value)}
                  />
                </td>
                <td className={`fixed-col col-1`}>
                  <input
                    type="text"
                    value={row.invitedBy || ""}
                    onChange={(e) => handleChange(rowIndex, "invitedBy", e.target.value)}
                  />
                </td>
                <td className="fixed-col col-2">
                  <DropdownCell
                  options={ageGroups}
                  value={row.consolidator}
                  onChange={(value) => handleDropdownChange(rowIndex, "consolidator", value)}
                  />
                </td>
                <td className={`fixed-col col-3`}>
                  {/* <input type="text" value={row.jan2025 || ""} onChange={(e) => handleChange(rowIndex, "jan2025", e.target.value)} />*/}
                  <DropdownCell
                    options={customStatuses}
                    value={row.jan2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "gender", value)}
                  /> 
                </td>
                <td className={`fixed-col col-4`}>
                  <DropdownCell
                    options={ageGroups}
                    value={row.ageGroup}
                    onChange={(value) => handleDropdownChange(rowIndex, "gender", value)}
                  /> 
                </td>
                <td className={`fixed-col col-5`}>
                  {/* <input type="text" value={row.mar2025 || ""} onChange={(e) => handleChange(rowIndex, "mar2025", e.target.value)} />*/}
                  <DropdownCell
                    options={customStatuses}
                    value={row.firstTimerIn}
                    onChange={(value) => handleDropdownChange(rowIndex, "firstTimerIn", value)}
                  />  
                </td>
                <td className={`fixed-col col-6`}>
                  {/* <input type="text" value={row.mar2025 || ""} onChange={(e) => handleChange(rowIndex, "mar2025", e.target.value)} />*/}
                  <DropdownCell
                    options={customStatuses}
                    value={row.firstTimeAttendance}
                    onChange={(value) => handleDropdownChange(rowIndex, "firstTimeAttendance", value)}
                  />  
                </td>
                <td className={`fixed-col col-7`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.may2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "jan2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-8`}>
                <DropdownCell
                    options={customStatuses}
                    value={row.jul2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "feb2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-9`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.sep2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "mar2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-10`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.nov2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "apr2025", value)}
                  />  
                </td>
                <td className={`fixed-col col-11`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "may2025", value)}
                  />
                </td>
                <td className={`fixed-col col-12`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "jun2025", value)}
                  />
                </td>
                <td className={`fixed-col col-13`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "jul2025", value)}
                  />
                </td>
                <td className={`fixed-col col-134`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "aug2025", value)}
                  />
                </td>
                <td className={`fixed-col col-15`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "sep2025", value)}
                  />
                </td>
                <td className={`fixed-col col-16`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "oct2025", value)}
                  />
                </td>
                <td className={`fixed-col col-17`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "nov2025", value)}
                  />
                </td>
                <td className={`fixed-col col-18`}>
                  <DropdownCell
                    options={customStatuses}
                    value={row.dec2025}
                    onChange={(value) => handleDropdownChange(rowIndex, "dec2025", value)}
                  />
                </td>
                <td className={`fixed-col col-19`}>
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

export default FTTable;
