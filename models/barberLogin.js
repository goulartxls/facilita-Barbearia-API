const pool = require('../services/database');
const Barber = require('./barber');

class BarberLogin {
  constructor(id, username, password, barber_id) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.barber_id = barber_id;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM barber_login');
      return rows.map(row => new BarberLogin(row.id, row.username, row.password, row.barber_id));
    } catch (err) {
      console.error('Error fetching all barber logins:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM barber_login WHERE id = $1', [id]);
      if (rows.length) {
        const { id, username, password, barber_id } = rows[0];
        return new BarberLogin(id, username, password, barber_id);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching barber login by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO barber_login (username, password, barber_id) VALUES ($1, $2, $3) RETURNING id',
        [this.username, this.password, this.barber_id]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new barber login:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE barber_login SET username = $1, password = $2, barber_id = $3 WHERE id = $4',
        [this.username, this.password, this.barber_id, this.id]
      );
    } catch (err) {
      console.error(`Error updating barber login with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const barber = await Barber.findById(this.barber_id);
    if (!barber) {
      throw new Error(`Barber not found with ID (${this.barber_id})`);
    }
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o login do barbeiro
      await client.query('DELETE FROM barber_login WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting barber login with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = BarberLogin;
