const datasetModel = require('../models/datasetModel.js');



module.exports = {
  addRecord: (req, res) => {
    const newRecord = req.body;
    datasetModel.addRecord(newRecord);
    res.json({ message: 'Record added successfully' });
  },

  deleteRecord: (req, res) => {
    const recordId = parseInt(req.params.id, 10);
    if (datasetModel.deleteRecord(recordId)) {
      res.json({ message: 'Record deleted successfully' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  },
};
