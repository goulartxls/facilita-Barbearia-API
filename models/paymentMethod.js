const pool = require('../services/database');

class PaymentMethod {
  constructor(id, name, description, taxes) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.taxes = taxes;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM payment_methods');
      return rows.map(row => new PaymentMethod(row.id, row.name, row.description, row.taxes));
    } catch (err) {
      console.error('Error fetching all payment methods:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM payment_methods WHERE id = $1', [id]);
      if (rows.length) {
        const { id, name, description, taxes } = rows[0];
        return new PaymentMethod(id, name, description, taxes);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching payment method by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO payment_methods (name, description, taxes) VALUES ($1, $2, $3) RETURNING id',
        [this.name, this.description, this.taxes]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new payment method:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE payment_methods SET name = $1, description = $2, taxes = $3 WHERE id = $4',
        [this.name, this.description, this.taxes, this.id]
      );
    } catch (err) {
      console.error(`Error updating payment method with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o método de pagamento
      await client.query('DELETE FROM payment_methods WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting payment method with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = PaymentMethod;
