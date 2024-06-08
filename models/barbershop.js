const pool = require('../services/database');

class BarberShop {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM barber_shop');
      return rows.map(row => new BarberShop(row.id, row.name, row.address));
    } catch (err) {
      console.error('Error fetching all barber shops:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM barber_shop WHERE id = $1', [id]);
      if (rows.length) {
        const { id, name, address } = rows[0];
        return new BarberShop(id, name, address);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching barber shop by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO barber_shop (name, address) VALUES ($1, $2) RETURNING id',
        [this.name, this.address]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new barber shop:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE barber_shop SET name = $1, address = $2 WHERE id = $3',
        [this.name, this.address, this.id]
      );
    } catch (err) {
      console.error(`Error updating barber shop with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    try {
      await pool.query('DELETE FROM barber_shop WHERE id = $1', [this.id]);
    } catch (err) {
      console.error(`Error deleting barber shop with ID (${this.id}):`, err);
      throw err;
    }
  }
}

module.exports = BarberShop;
