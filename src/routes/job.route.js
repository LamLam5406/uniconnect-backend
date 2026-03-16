const router = require('express').Router();
const jobController = require('../controllers/job.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/', verifyToken, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/apply', verifyToken, jobController.applyJob);
router.put('/apply/status', verifyToken, jobController.updateApplicationStatus);
router.get('/:id/applicants', verifyToken, jobController.getJobApplicants);

module.exports = router;
