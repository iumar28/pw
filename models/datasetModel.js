const fs = require('fs');
const path = require('path');

// const datasetPath = path.join('./dataset.json');
const datasetPath = path.join('dataset.json')

let dataset = [];

function loadDataset() {
  try {
    const data = fs.readFileSync(datasetPath, 'utf-8');
    dataset = JSON.parse(data);
  } catch (error) {
    console.error('Error loading dataset:', error);
    dataset = [];
  }
}

function saveDataset() {
  try {
    const data = JSON.stringify(dataset, null, 2);
    fs.writeFileSync(datasetPath, data);
  } catch (error) {
    console.error('Error saving dataset:', error);
  }
}

loadDataset();

module.exports = {
  getDataset: () => dataset,

  addRecord: (record) => {
    // Assign a unique ID to the record (you may use a library for this)
    record.id = Date.now();
    dataset.push(record);
    saveDataset();
  },

  deleteRecord: (id) => {
    const index = dataset.findIndex((record) => record.id === id);
    if (index !== -1) {
      dataset.splice(index, 1);
      saveDataset();
      return true;
    }
    return false;
  },

  calculateStatistics: () => {
    if (dataset.length === 0) {
      return null;
    }

    const salaries = dataset.map((record) => record.salary);
    const mean = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);

    return { mean, min, max };
  },

  calculateOnContractStatistics: () => {
    const onContractRecords = dataset.filter((record) => record.on_contract === 'true');

    if (onContractRecords.length === 0) {
      return null;
    }

    const salaries = onContractRecords.map((record) => record.salary);
    const mean = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);

    return { mean, min, max };
  },

  calculateDepartmentStatistics: () => {
    if (dataset.length === 0) {
      return null;
    }

    const departmentStats = {};

    dataset.forEach((record) => {
      const { department, salary } = record;
      if (!departmentStats[department]) {
        departmentStats[department] = { count: 0, totalSalary: 0 };
      }
      departmentStats[department].count += 1;
      departmentStats[department].totalSalary += salary;
    });

    for (const department in departmentStats) {
      departmentStats[department].mean =
        departmentStats[department].totalSalary / departmentStats[department].count;
      const salaries = dataset
        .filter((record) => record.department === department)
        .map((record) => record.salary);
      departmentStats[department].min = Math.min(...salaries);
      departmentStats[department].max = Math.max(...salaries);
    }

    return departmentStats;
  },

  calculateSubDepartmentStatistics: (subDepartment) => {
    if (dataset.length === 0) {
      return null;
    }

    const subDepartmentStats = dataset
      .filter((record) => record.sub_department === subDepartment);

    if (subDepartmentStats.length === 0) {
      return null;
    }

    const salaries = subDepartmentStats.map((record) => record.salary);
    const mean = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);

    return { mean, min, max };
  },
};
