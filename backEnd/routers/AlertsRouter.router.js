const { Router } = require('express');
const {
    getAllAlerts,
    getAlert,
    createAlert,
    updateAlert,
    deleteAlert,
} = require('../controllers/Alerts.controller');

const AlertsRouter = new Router();

AlertsRouter.get('/', getAllAlerts);
AlertsRouter.get('/:id', getAlert);
AlertsRouter.post('/', createAlert);
AlertsRouter.put('/:id', updateAlert);
AlertsRouter.put('/', updateAlert);
AlertsRouter.delete('/:id', deleteAlert);

module.exports = { AlertsRouter };