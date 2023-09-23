
const express = require('express');
const router = express.Router();

const recordController = require('../controllers/recordController');
const statisticsController = require('../controllers/statisticsController');
const Joi = require('joi');


function validateInput(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: 'Invalid input data', details: error.details });
      }
      next();
    };
  }
  
  const recordSchema = Joi.object({
    name: Joi.string().required(),
    salary: Joi.number().required(),
    currency: Joi.string(),
    department: Joi.string(),
    on_contract: Joi.string(),
    sub_department: Joi.string(),
  });


router.post('/records', validateInput(recordSchema), recordController.addRecord); // api to add neww record with the validtion defines above

 
router.delete('/records/:id', recordController.deleteRecord); //delete

router.get('/statistics', statisticsController.getStatistics);


router.get('/statistics/on_contract', statisticsController.getStatisticsOnContract);

router.get('/statistics/department', statisticsController.getDepartmentStatistics);

router.get('/statistics/department/:sub_department', statisticsController.getDepartmentSubDepartmentStatistics);

module.exports = router;
