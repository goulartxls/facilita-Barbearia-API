const pool = require('../services/database');

class OrderService {
  constructor(id, date, time, client_id, service_id, barber_id) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.client_id = client_id;
    this.service_id = service_id;
    this.barber_id = barber_id;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM order_services');
      return rows.map(row => new OrderService(row.id, row.date, row.time, row.client_id, row.service_id, row.barber_id));
    } catch (err) {
      console.error('Error fetching all order services:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM order_services WHERE id = $1', [id]);
      if (rows.length) {
        const { id, date, time, client_id, service_id, barber_id } = rows[0];
        return new OrderService(id, date, time, client_id, service_id, barber_id);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching order service by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO order_services (date, time, client_id, service_id, barber_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [this.date, this.time, this.client_id, this.service_id, this.barber_id]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new order service:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE order_services SET date = $1, time = $2, client_id = $3, service_id = $4, barber_id = $5 WHERE id = $6',
        [this.date, this.time, this.client_id, this.service_id, this.barber_id, this.id]
      );
    } catch (err) {
      console.error(`Error updating order service with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deleting the order service
      await client.query('DELETE FROM order_services WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting order service with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = OrderService;
