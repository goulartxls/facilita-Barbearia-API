const Barber = require('../models/barber');

const BarberController = {
  async createBarber(req, res) {
    try {
      const barber = new Barber(null, req.body.name, req.body.cpf, req.body.phone, req.body.barber_shop_id);
      await barber.save();
      res.status(201).json({ message: 'Barber created successfully', barber });
    } catch (err) {
      res.status(500).json({ error: 'Error creating barber', details: err.message });
    }
  },

  async getAllBarbers(req, res) {
    try {
      const barbers = await Barber.getAll();
      res.status(200).json(barbers);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all barbers', details: err.message });
    }
  },

  async getBarberById(req, res) {
    const { id } = req.params;
    try {
      const barber = await Barber.getById(id);
      if (!barber) {
        res.status(404).json({ message: 'Barber not found' });
      } else {
        res.status(200).json(barber);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching barber with ID ${id}`, details: err.message });
    }
  },

  async updateBarber(req, res) {
    const { id } = req.params;
    try {
      const barber = await Barber.getById(id);
      if (!barber) {
        res.status(404).json({ message: 'Barber not found' });
      } else {
        barber.name = req.body.name;
        barber.cpf = req.body.cpf;
        barber.phone = req.body.phone;
        await barber.update();
        res.status(200).json({ message: 'Barber updated successfully', barber });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating barber with ID ${id}`, details: err.message });
    }
  },

  async deleteBarber(req, res) {
    const { id } = req.params;
    try {
      const barber = await Barber.getById(id);
      if (!barber) {
        res.status(404).json({ message: 'Barber not found' });
      } else {
        await barber.delete();
        res.status(200).json({ message: 'Barber deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting barber with ID ${id}`, details: err.message });
    }
  },

  async getBarberShop(req, res) {
    const { id } = req.params;
    try {
      const barber = await Barber.getById(id);
      if (!barber) {
        res.status(404).json({ message: 'Barber not found' });
      } else {
        const barber_shop = await barber.getBarberShop();
        if (!barber_shop) {
          res.status(404).json({ message: 'Barber shop not found' });
        } else {
          res.status(200).json(barber_shop);
        }
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching barber shop of ID ${id}`, details: err.message });
    }
  }
};

module.exports = BarberController;
