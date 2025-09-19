import { useState, useEffect  } from 'react';
import Table from '../../components/Table/Table';
import { FTTableColumns } from './FTTableData';
import Modal from '../../components/Modal/Modal'; 
import './FTPage.css';


const FTPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('/api/first-timers')
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(err => console.error('Failed to load first timers:', err));
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    name: '',
    gender: '',
    age: '',
    invited_by: '',
    age_group: '',
    fellowship: '',
    tribe_of: '',
    consolidated_by: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/first-timers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        // const newEntry = await res.json();
        // setRows(prev => [newEntry, ...prev]); // add to table
        // setFormData({ // reset form
        //   date: '', name: '', gender: '', age: '', invited_by: '',
        //   age_group: '', fellowship: '', tribe_of: '', consolidated_by: ''
        // });
        // setShowModal(false);
        window.location.reload();
      } else {
        console.error('Insert failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };  

  return (
    <section>
      <div className="page-FT-table">
        <div className="ft-header">
          <h2>First Timers</h2>
          <button className="add-btn" onClick={() => setShowModal(true)}>+ Add</button>
        </div>
        <h2>-</h2>
        <Table columns={FTTableColumns} rows={rows} />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Register First Timer"
      >
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="form-group full-width">
              <label htmlFor="invitedBy">Invited By</label>
              <input type="text" id="invited_by" name="invited_by" value={formData.invited_by} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="ageGroup">Age Group</label>
              <select id="age_group" name="age_group" value={formData.age_group} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="Youth">Youth</option>
                <option value="Single Adult">Single Adult</option>
                <option value="Married">Married</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fellowshipAttended">Fellowship Attended</label>
              <select id="fellowshipAttended" name="fellowshipAttended" value={formData.fellowshipAttended} onChange={handleChange} required>
                <option value=""> </option>
                <option value="sa">SA</option>
                <option value="tgiff">TGIFF</option>
                <option value="tgiss">TGISS</option>
                <option value="intouch">Intouch Night</option>
                <option value="sundayservice">Sunday Service</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tribeOf">Tribe Of</label>
              <select id="tribe_of" name="tribe_of" value={formData.tribe_of} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="jetCinco">Jet Cinco</option>
                <option value="rafSantos">Rafael Santos</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="consoBy">Consolidated By</label>
              <select id="consolidated_by" name="consolidated_by" value={formData.consolidated_by} onChange={handleChange} required>
                <option value="">This would fetch the records from the master table...</option>
                <option value="Jet Cinco">Jet Cinco</option>
                <option value="rafSantos">Rafael Santos</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default FTPage;
