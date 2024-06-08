const pool = require('../services/database');
const Client = require('./client');

class User {
  constructor(id, username, password, client_id) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.client_id = client_id;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM users');
      return rows.map(row => new User(row.id, row.username, row.password, row.client_id));
    } catch (err) {
      console.error('Error fetching all users:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (rows.length) {
        const { id, username, password, client_id } = rows[0];
        return new User(id, username, password, client_id);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching user by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO users (username, password, client_id) VALUES ($1, $2, $3) RETURNING id',
        [this.username, this.password, this.client_id]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new user:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE users SET username = $1, password = $2, client_id = $3 WHERE id = $4',
        [this.username, this.password, this.client_id, this.id]
      );
    } catch (err) {
      console.error(`Error updating user with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o usuário
      await client.query('DELETE FROM users WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting user with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = User;
