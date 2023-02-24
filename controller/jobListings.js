const {
  getJobListings,
  findUserById,
  findJobListingById,
  deleteJobListing,
  editJobListing,
  createJobListing,
} = require("../database");
const { formatDate } = require("../utils/format");

async function getAllJobListings(req, res) {
  const { page } = req.body;

  try {
    const jobListings = await getJobListings(page);
    res.status(200).json({ job_listings: jobListings });
  } catch (error) {
    console.log(error);
  }
}

async function deleteJobListingCntrl(req, res) {
  try {
    const { job_listing_id } = req.body;
    const userId = req.userId;
    const jobListing = await findJobListingById(job_listing_id);

    if (userId == jobListing.creator) {
      await deleteJobListing(job_listing_id);
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {}
}

async function editJobListingCntrl(req, res) {
  try {
    const {
      job_listing_id,
      title,
      description,
      expirience_level,
      location,
      salary,
    } = req.body;

    const userId = req.userId;
    console.log("user id: " + userId);
    const jobListing = await findJobListingById(job_listing_id);

    if (!(userId == jobListing.creator)) {
      res.status(403).json({ message: "Forbidden" });
    } else {
      const data = { title, description, expirience_level, location, salary };
      await editJobListing(job_listing_id, data);
      res.status(200).json({ message: "Deleted" });
    }
  } catch (error) {}
}

async function createJobListingCntrl(req, res) {
  try {
    const { title, experience_level, location, salary, description } = req.body;
    const data = {
      title,
      experience_level,
      location,
      salary,
      description,
      created_at: formatDate(),
      creator: req.userId,
    };

    // // title, experience_level, location, salary, creator, description, created_at
    // formatDate();
    createJobListing(data);
    res.status(201).json({ message: "Created" });
  } catch (error) {}
}

module.exports = {
  getAllJobListings,
  deleteJobListingCntrl,
  editJobListingCntrl,
  createJobListingCntrl,
};
