import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Table from '../../components/Table/Table';
import { LeadersTableColumns } from './LeadersTableData';
import Modal from '../../components/Modal/Modal'; 

const LeadersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Axios GET request to fetch leader data
    axios.get('/api/leaders')
      .then(res => setRows(res.data))
      .catch(err => console.error('Failed to load leaders:', err));
  }, []);

  return (
    <section>
        <div className="page-leaders-table">
          <div className="ft-header">
            <h2>First Timers</h2>
            <button className="add-btn" onClick={() => setShowModal(true)}>+ Add</button>
          </div>
          <h2>-</h2>
          <Table columns={LeadersTableColumns} rows={rows} />
        </div>

        <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Register Leader"
              >
                <form className="modal-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="date">Date Turned Leader</label>
                      <input type="date" id="date" name="date" required />
                    </div>
        
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" required />
                    </div>
        
                    <div className="form-group">
                      <label htmlFor="pLeader">P12 Leader</label>
                      <select id="pLeader" name="pLeader" required>
                        <option value="">Select...</option>
                        <option value="Male">Jet Cinco</option>
                        <option value="Female">Rafael Santos</option>
                      </select>
                    </div>
        
                    <div className="form-group">
                      <label htmlFor="leader">Leader</label>
                      <select id="leader" name="leader" required>
                        <option value="">Select...</option>
                        <option value="Male">Jet Cinco</option>
                        <option value="Female">Rafael Santos</option>
                      </select>
                    </div>
        
                    <div className="form-group full-width">
                      <label htmlFor="invitedBy">Invited By</label>
                      <input type="text" id="invitedBy" name="invitedBy" required />
                    </div>
                  </div>
        
                  <div className="form-actions">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </Modal>
    </section>
  )
};

export default LeadersPage;
