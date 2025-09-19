import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './db/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API route to fetch leaders
app.get('/api/leaders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM base_fpcp_members ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching leaders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to fetch first timers
app.get('/api/first-timers', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        TO_CHAR(date, 'YYYY-MM-DD') AS date,
        name,
        gender,
        age,
        age_group,
        invited_by,
        tribe_of,
        consolidated_by,
        fellowship
      FROM base_first_timers
      ORDER BY id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching first timers:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to post first timers
app.post('/api/first-timers', async (req, res) => {
  const {
    date, name, gender, age,
    invited_by, age_group,
    fellowship, tribe_of, consolidated_by
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO base_first_timers
      (date, name, gender, age, invited_by, age_group, fellowship, tribe_of, consolidated_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [date, name, gender, age, invited_by, age_group, fellowship, tribe_of, consolidated_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting first timer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// old date time TO_CHAR(requested_datetime, 'YYYY-MM-DD"T"HH24:MI') AS requested_datetime
// API route to fetch facility bookings
app.get('/api/facility-bookings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        facility,
        purpose,
        requested_by,
        approved_by,
        remarks,
        air_conditioning,
        projector_tv,
        kitchen_utensils,
        sound_system,
        chairs,
        tables,
        other_equipments,
        start_datetime,
        requested_end_datetime AS end_datetime
      FROM base_facility_reservation
      ORDER BY start_datetime ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching facility bookings:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to post a new facility booking
app.post('/api/facility-bookings', async (req, res) => {
  const {
    facility,
    purpose,
    requested_by,
    approved_by,
    remarks,
    air_conditioning,
    projector_tv,
    kitchen_utensils,
    sound_system,
    chairs,
    tables,
    other_equipments,
    start_datetime,
    requested_end_datetime
  } = req.body;

  try {
    const overlapCheck = await pool.query(
      `SELECT * FROM base_facility_reservation
       WHERE facility = $1
       AND start_datetime < $3
       AND requested_end_datetime > $2`,
      [facility, start_datetime, requested_end_datetime]
    );

    if (overlapCheck.rows.length > 0) {
      return res.status(400).json({ error: 'This facility is already booked at that time.' });
    }

    const result = await pool.query(
      `INSERT INTO base_facility_reservation (
        facility, purpose, requested_by, start_datetime, requested_end_datetime, approved_by, remarks,
        air_conditioning, projector_tv, kitchen_utensils, sound_system, chairs, tables, other_equipments
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *`,
      [
        facility, purpose, requested_by, start_datetime, requested_end_datetime, approved_by, remarks,
        air_conditioning, projector_tv, kitchen_utensils, sound_system, chairs, tables, other_equipments
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect `/` to `/leaders`
app.get('/', (req, res) => {
  res.redirect('/leaders');
});

// Fallback route to handle React SPA
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
