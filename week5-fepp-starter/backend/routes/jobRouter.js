const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByType,
  getJobsByLocation,
  filterJobsBySalary,
  getJobsByCompany,
  deleteJobsByCompany,
  countJobsByType,
} = require("../controllers/jobControllers");

const router = express.Router();

// Define specific routes first
router.get("/salary", filterJobsBySalary);
router.get("/type/:type", getJobsByType);
router.get("/location/:location", getJobsByLocation);
router.get("/company/:companyName", getJobsByCompany);
router.get("/count/type/:type", countJobsByType);
router.delete("/company/:companyName", deleteJobsByCompany);

// Dynamic routes for job ID
router.patch('/:id/company/contact', updateCompanyContact);
router.get("/:jobId", getJobById);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

// Other routes
router.get("/", getAllJobs);
router.post("/", createJob);

module.exports = router;
