const AdminModel = require('../models/admin');
const authMiddleware = require('../auth');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const config = require('../config');

app.post('/create-admin', async (req, res) => {
    const adminData = req.body;
    try {
      const admin = new AdminModel(adminData);
      await admin.save();
        res.status(201).json({ message: 'Administrador creado exitosamente' });
      }catch (error) {
        res.status(400).json({ message: 'No se pudo crear el administrador', error: error.message });
      }
  });



  app.delete('/delete-admin/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
      const admin = await AdminModel.findOneAndDelete ({ _id });
      if (!admin) {
        return res.status(404).json({ message: 'Administrador no encontrado' });
      }
      res.json({ message: 'Administrador eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el administrador', error: error.message });
    }
  });


  app.put('/update-admin/:_id', async (req, res) => {
    const _id = req.params._id;
    const adminData = req.body;
  
    try {
      const admin = await AdminModel.findOneAndUpdate({ _id }, adminData, { new: true });
  
      if (!admin) {
        return res.status(404).json({ message: 'Administrador no encontrado' });
      }
  
      res.json({ message: 'Administrador actualizado exitosamente', admin });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el administrador', error: error.message });
    }
  });
  
  module.exports = app;