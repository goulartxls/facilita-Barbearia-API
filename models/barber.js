const pool = require('../services/database');
const BarberShop = require('./barbershop');

class Barber {
  constructor(id, name, cpf, phone, barber_shop_id) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
    this.barber_shop_id = barber_shop_id;
  }

  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM barber');
      return rows.map(row => new Barber(row.id, row.name, row.cpf, row.phone, row.barber_shop_id));
    } catch (err) {
      console.error('Error fetching all barbers:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM barber WHERE id = $1', [id]);
      if (rows.length) {
        const { id, name, cpf, phone, barber_shop_id } = rows[0];
        return new Barber(id, name, cpf, phone, barber_shop_id);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching barber by ID (${id}):`, err);
      throw err;
    }
  }

  async save() {
    try {
      const { rows } = await pool.query(
        'INSERT INTO barber (name, cpf, phone, barber_shop_id) VALUES ($1, $2, $3, $4) RETURNING id',
        [this.name, this.cpf, this.phone, this.barber_shop_id]
      );
      this.id = rows[0].id;
    } catch (err) {
      console.error('Error saving new barber:', err);
      throw err;
    }
  }

  async update() {
    try {
      await pool.query(
        'UPDATE barber SET name = $1, cpf = $2, phone = $3 WHERE id = $4',
        [this.name, this.cpf, this.phone, this.id]
      );
    } catch (err) {
      console.error(`Error updating barber with ID (${this.id}):`, err);
      throw err;
    }
  }

  async delete() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Deletar o barbeiro
      await client.query('DELETE FROM barber WHERE id = $1', [this.id]);
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`Error deleting barber with ID (${this.id}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }

  async getBarberShop() {
    try {
      const { rows } = await pool.query('SELECT * FROM barber_shop WHERE id = $1', [this.barber_shop_id]);
      if (rows.length) {
        const { name, address } = rows[0];
        return new BarberShop(name, address);
      }
      return null;
    } catch (err) {
      console.error(`Error fetching barber shop of ID (${this.barber_shop_id}):`, err);
      throw err;
    }
  }
}

module.exports = Barber;
