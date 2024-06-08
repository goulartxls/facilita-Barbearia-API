const pool = require('../services/database');

class Client {
  constructor(id, name, cpf, phone) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM clients');
      return rows.map(row => new Client(row.id, row.name, row.cpf, row.phone));
    } catch (err) {
      console.error('Error fetching all clients:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
      if (rows.length) {
        const { id, name, cpf, phone } = rows[0];
        return new Client(id, name, cpf, phone);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching client by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO clients (name, cpf, phone) VALUES ($1, $2, $3) RETURNING id',
        [this.name, this.cpf, this.phone]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new client:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE clients SET name = $1, cpf = $2, phone = $3 WHERE id = $4',
        [this.name, this.cpf, this.phone, this.id]
      );
    } catch (err) {
      console.error(`Error updating client with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o cliente
      await client.query('DELETE FROM clients WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting client with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = Client;
