const express = require("express");
const {
  getAllJobListings,
  deleteJobListingCntrl,
  editJobListingCntrl,
  createJobListingCntrl,
} = require("../controller/jobListings");
const { authUser } = require("../middleware/security");
const {
  validateGetJoblistings,
  validateDeleteJobListing,
  validateEditJobListing,
  validateCreateJobListing,
} = require("../middleware/validation");
const router = express.Router();

router.post("/get-job-listings", validateGetJoblistings, getAllJobListings);

router.delete(
  "/delete-job-listing",
  authUser,
  validateDeleteJobListing,
  deleteJobListingCntrl
);

router.put(
  "/edit-job-listing",
  authUser,
  validateEditJobListing,
  editJobListingCntrl
);

router.post(
  "/create-job-listing",
  authUser,
  validateCreateJobListing,
  createJobListingCntrl
);

module.exports = router;
