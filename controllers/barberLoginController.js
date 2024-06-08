const BarberLogin = require('../models/barberLogin');

const BarberLoginController = {
  async createBarberLogin(req, res) {
    try {
      const barberLogin = new BarberLogin(null, req.body.username, req.body.password, req.body.barber_id);
      await barberLogin.save();
      res.status(201).json({ message: 'Barber login created successfully', barberLogin });
    } catch (err) {
      res.status(500).json({ error: 'Error creating barber login', details: err.message });
    }
  },

  async getAllBarberLogins(req, res) {
    try {
      const barberLogins = await BarberLogin.getAll();
      res.status(200).json(barberLogins);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all barber logins', details: err.message });
    }
  },

  async getBarberLoginById(req, res) {
    const { id } = req.params;
    try {
      const barberLogin = await BarberLogin.getById(id);
      if (!barberLogin) {
        res.status(404).json({ message: 'Barber login not found' });
      } else {
        res.status(200).json(barberLogin);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching barber login with ID ${id}`, details: err.message });
    }
  },

  async updateBarberLogin(req, res) {
    const { id } = req.params;
    try {
      const barberLogin = await BarberLogin.getById(id);
      if (!barberLogin) {
        res.status(404).json({ message: 'Barber login not found' });
      } else {
        barberLogin.username = req.body.username;
        barberLogin.password = req.body.password;
        barberLogin.barber_id = req.body.barber_id;
        await barberLogin.update();
        res.status(200).json({ message: 'Barber login updated successfully', barberLogin });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating barber login with ID ${id}`, details: err.message });
    }
  },

  async deleteBarberLogin(req, res) {
    const { id } = req.params;
    try {
      const barberLogin = await BarberLogin.getById(id);
      if (!barberLogin) {
        res.status(404).json({ message: 'Barber login not found' });
      } else {
        await barberLogin.delete();
        res.status(200).json({ message: 'Barber login deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting barber login with ID ${id}`, details: err.message });
    }
  }
};

module.exports = BarberLoginController;
