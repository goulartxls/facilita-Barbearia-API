const pool = require('../services/database');
const Client = require('./client');
const Product = require('./product');

class OrderProduct {
  constructor(id, date, client_id, product_id, quantity, price) {
    this.id = id;
    this.date = date;
    this.client_id = client_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.price = price;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM order_products');
      return rows.map(row => new OrderProduct(row.id, row.date, row.client_id, row.product_id, row.quantity, row.price));
    } catch (err) {
      console.error('Error fetching all order products:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM order_products WHERE id = $1', [id]);
      if (rows.length) {
        const { id, date, client_id, product_id, quantity, price } = rows[0];
        return new OrderProduct(id, date, client_id, product_id, quantity, price);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching order product by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO order_products (date, client_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [this.date, this.client_id, this.product_id, this.quantity, this.price]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new order product:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE order_products SET date = $1, client_id = $2, product_id = $3, quantity = $4, price = $5 WHERE id = $6',
        [this.date, this.client_id, this.product_id, this.quantity, this.price, this.id]
      );
    } catch (err) {
      console.error(`Error updating order product with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o produto de ordem
      await client.query('DELETE FROM order_products WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting order product with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = OrderProduct;
