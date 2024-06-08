const BarberShop = require('../models/barbershop');

const BarberShopController = {
  async createBarberShop(req, res) {
    try {
      const barberShop = new BarberShop(null, req.body.name, req.body.address);
      await barberShop.save();
      res.status(201).json({ message: 'Barber shop created successfully', barberShop });
    } catch (err) {
      res.status(500).json({ error: 'Error creating barber shop', details: err.message });
    }
  },

  async getAllBarberShops(req, res) {
    try {
      const barberShops = await BarberShop.getAll();
      res.status(200).json(barberShops);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all barber shops', details: err.message });
    }
  },

  async getBarberShopById(req, res) {
    const { id } = req.params;
    try {
      const barberShop = await BarberShop.getById(id);
      if (!barberShop) {
        res.status(404).json({ message: 'Barber shop not found' });
      } else {
        res.status(200).json(barberShop);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching barber shop with ID ${id}`, details: err.message });
    }
  },

  async updateBarberShop(req, res) {
    const { id } = req.params;
    try {
      const barberShop = await BarberShop.getById(id);
      if (!barberShop) {
        res.status(404).json({ message: 'Barber shop not found' });
      } else {
        barberShop.name = req.body.name;
        barberShop.address = req.body.address;
        await barberShop.update();
        res.status(200).json({ message: 'Barber shop updated successfully', barberShop });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating barber shop with ID ${id}`, details: err.message });
    }
  },

  async deleteBarberShop(req, res) {
    const { id } = req.params;
    try {
      const barberShop = await BarberShop.getById(id);
      if (!barberShop) {
        res.status(404).json({ message: 'Barber shop not found' });
      } else {
        await barberShop.delete();
        res.status(200).json({ message: 'Barber shop deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting barber shop with ID ${id}`, details: err.message });
    }
  }
};

module.exports = BarberShopController;
