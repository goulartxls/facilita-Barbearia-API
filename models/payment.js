const pool = require('../services/database');
const Order = require('./order');

class Payment {
  constructor(id, order_id, payment_method_id, amount, payment_date) {
    this.id = id;
    this.order_id = order_id;
    this.payment_method_id = payment_method_id;
    this.amount = amount;
    this.payment_date = payment_date;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM payments');
      return rows.map(row => new Payment(row.id, row.order_id, row.payment_method_id, row.amount, row.payment_date));
    } catch (err) {
      console.error('Error fetching all payments:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
      if (rows.length) {
        const { id, order_id, payment_method_id, amount, payment_date } = rows[0];
        return new Payment(id, order_id, payment_method_id, amount, payment_date);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching payment by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO payments (order_id, payment_method_id, amount, payment_date) VALUES ($1, $2, $3, $4) RETURNING id',
        [this.order_id, this.payment_method_id, this.amount, this.payment_date]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new payment:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE payments SET order_id = $1, payment_method_id = $2, amount = $3, payment_date = $4 WHERE id = $5',
        [this.order_id, this.payment_method_id, this.amount, this.payment_date, this.id]
      );
    } catch (err) {
      console.error(`Error updating payment with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o pagamento
      await client.query('DELETE FROM payments WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting payment with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = Payment;
