const Client = require('../models/client');

const ClientController = {
  async createClient(req, res) {
    try {
      const client = new Client(null, req.body.name, req.body.cpf, req.body.phone);
      await client.save();
      res.status(201).json({ message: 'Client created successfully', client });
    } catch (err) {
      res.status(500).json({ error: 'Error creating client', details: err.message });
    }
  },

  async getAllClients(req, res) {
    try {
      const clients = await Client.getAll();
      res.status(200).json(clients);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all clients', details: err.message });
    }
  },

  async getClientById(req, res) {
    const { id } = req.params;
    try {
      const client = await Client.getById(id);
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
      } else {
        res.status(200).json(client);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching client with ID ${id}`, details: err.message });
    }
  },

  async updateClient(req, res) {
    const { id } = req.params;
    try {
      const client = await Client.getById(id);
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
      } else {
        client.name = req.body.name;
        client.cpf = req.body.cpf;
        client.phone = req.body.phone;
        await client.update();
        res.status(200).json({ message: 'Client updated successfully', client });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating client with ID ${id}`, details: err.message });
    }
  },

  async deleteClient(req, res) {
    const { id } = req.params;
    try {
      const client = await Client.getById(id);
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
      } else {
        await client.delete();
        res.status(200).json({ message: 'Client deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting client with ID ${id}`, details: err.message });
    }
  }
};

module.exports = ClientController;
