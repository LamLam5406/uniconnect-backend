const router = require('express').Router();
const jobController = require('../controllers/job.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/', verifyToken, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/apply', verifyToken, jobController.applyJob);
router.put('/apply/status', verifyToken, jobController.updateApplicationStatus);
router.get('/:id/applicants', verifyToken, jobController.getJobApplicants);
//Update 17/5
router.put('/:id', verifyToken, jobController.updateJob);
router.delete('/:id', verifyToken, jobController.deleteJob);

module.exports = router;
