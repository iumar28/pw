// controllers/statisticsController.js
const datasetModel = require('../models/datasetModel.js');

module.exports = {
  getStatistics: (req, res) => {
    const statistics = datasetModel.calculateStatistics();
    if (statistics) {
      res.json(statistics);
    } else {
      res.status(404).json({ error: 'No data available' });
    }
  },

  getStatisticsOnContract: (req, res) => {
    const onContractStatistics = datasetModel.calculateOnContractStatistics();
    if (onContractStatistics) {
      res.json(onContractStatistics);
    } else {
      res.status(404).json({ error: 'No data on contract found' });
    }
  },

  getDepartmentStatistics: (req, res) => {
    const departmentStatistics = datasetModel.calculateDepartmentStatistics();
    if (departmentStatistics) {
      res.json(departmentStatistics);
    } else {
      res.status(404).json({ error: 'No data by department found' });
    }
  },

  getDepartmentSubDepartmentStatistics: (req, res) => {
    const subDepartment = req.params.sub_department;
    const subDepartmentStatistics = datasetModel.calculateSubDepartmentStatistics(subDepartment);
    if (subDepartmentStatistics) {
      res.json(subDepartmentStatistics);
    } else {
      res.status(404).json({ error: 'No data for the specified sub-department found' });
    }
  },
};
