const { Router } = require('express');
const {
    getAllOrganizations,
    getOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization,
} = require('../controllers/Organizations.controller');

const OrganizationsRouter = new Router();

OrganizationsRouter.get('/', getAllOrganizations);
OrganizationsRouter.get('/:id', getOrganization);
OrganizationsRouter.post('/', createOrganization);
OrganizationsRouter.put('/:id', updateOrganization);
OrganizationsRouter.put('/', updateOrganization);
OrganizationsRouter.delete('/:id', deleteOrganization);

module.exports = { OrganizationsRouter };