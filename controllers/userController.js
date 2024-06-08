const User = require('../models/user');

const UserController = {
  async createUser(req, res) {
    try {
      const user = new User(null, req.body.username, req.body.password, req.body.client_id);
      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      res.status(500).json({ error: 'Error creating user', details: err.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all users', details: err.message });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.getById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching user with ID ${id}`, details: err.message });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.getById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        user.username = req.body.username;
        user.password = req.body.password;
        user.client_id = req.body.client_id;
        await user.update();
        res.status(200).json({ message: 'User updated successfully', user });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating user with ID ${id}`, details: err.message });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.getById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await user.delete();
        res.status(200).json({ message: 'User deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting user with ID ${id}`, details: err.message });
    }
  }
};

module.exports = UserController;
