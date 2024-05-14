const { Apartment, Manager, Tenant, Issues } = require("../models")
const tenantsData = require('./tenant-seeds.json');
const issuesData = require('./issue-seeds.json');
const mangersData = require('./manager-seeds.json');
const apartmentsData = require('./apartment-seeds.json');


const apt = {Apartment}
const mgr = {Manager}
const tenant = {Tenant}

const issues = [
    { apt_id: 1, manager_id: 1, tenant_id: 1 }
]




/*
    app.get("/api/issue/:id", (req, res) => {
        Issue.findByPk(req.params.id, {
            include: [Apartment, Manager, Tenant]
        })

    })

*/