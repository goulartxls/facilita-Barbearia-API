const pool = require('../services/database');

class Service {
  constructor(id, name, description, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM services');
      return rows.map(row => new Service(row.id, row.name, row.description, row.price));
    } catch (err) {
      console.error('Error fetching all services:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
      if (rows.length) {
        const { id, name, description, price } = rows[0];
        return new Service(id, name, description, price);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching service by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING id',
        [this.name, this.description, this.price]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new service:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE services SET name = $1, description = $2, price = $3 WHERE id = $4',
        [this.name, this.description, this.price, this.id]
      );
    } catch (err) {
      console.error(`Error updating service with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o serviço
      await client.query('DELETE FROM services WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting service with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = Service;
