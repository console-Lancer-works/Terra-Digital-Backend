const express = require("express");
const SiteController = require("../controllers/Frontend/SiteController");
const agentFrontendController = require("../controllers/Frontend/AgentController");
const propertyController = require("../controllers/Frontend/PropertyController");
const newsLettterCtrl = require("../controllers/Frontend/NewsLetterController");
const dashboardController = require("../controllers/Frontend/DashboardController");

const isAuth = require("../middleware/isAuth");
const {
  registration,
  login,
  sendOtp,
  verifyOtp,
  verifyEmail,
  forgotpassword,
} = require("../controllers/Frontend/AuthController");
const { checkAuth } = require("../middleware/checkAuth");
const {
  getprovinces,
  fetchcities,
  getcountries,
  contactagent,
} = require("../controllers/Frontend/CommonController");
const {
  getprofile,
  changepassword,
  editprofile,
} = require("../controllers/Frontend/ProfileController");
const multer = require("multer");
const router = express.Router();

//Without Auth Api
router.get("/get-site-settings/:domain", SiteController.getSiteSettings);
router.get("/get-featured/:domain/:type", SiteController.getFeatured);
router.get(
  "/get-featured-agents/:domain/:province/:city",
  agentFrontendController.getFeaturedAgents
);
router.post("/location-autosuggest", propertyController.locationAutoSuggest);
router.post("/get-property-list", propertyController.getPropertyList);
router.post(
  "/get-lister-properties",
  checkAuth,
  propertyController.getPropertyListDashboard
);
router.post("/get-property-details", propertyController.getPropertyDetails);
router.get("/get-features", propertyController.getFeatures);
router.get("/get-appliances", propertyController.getAppliances);

router.post(
  "/add-property",
  checkAuth,
  multer({ dest: "temp/" }).array("photos", 3),
  propertyController.addProperty
);
router.post(
  "/get-featured-places-listing",
  SiteController.getFeaturedPlacesListing
);
router.post(
  "/get-featured-places-listing",
  SiteController.getFeaturedPlacesListing
);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/verify-email/:token", verifyEmail);
router.post("/sign-up", registration);
router.post("/login", login);
router.post("/get-agents", agentFrontendController.GetAgents);

router.post("/get-agent-leads", checkAuth, agentFrontendController.getEnquiry);

router.post("/lead-reply", checkAuth, agentFrontendController.postLeadReply);

// router.post("/newsletter-subscribe", newsLettterCtrl.newsLetter);

router.post("/get-profile", checkAuth, getprofile);
router.get("/get-countries", checkAuth, getcountries);
router.post("/get-cities", fetchcities);
router.post("/change-password", checkAuth, changepassword);
router.post(
  "/edit-profile",
  checkAuth,
  multer({ dest: "temp/" }).single("profile_image"),
  editprofile
);

router.post("/get-dashboard-data", checkAuth, dashboardController.getDashboard);
router.post(
  "/get-favorite-properties",
  checkAuth,
  propertyController.getfavouritedetails
);
router.post("/get-provinces", getprovinces);
router.post("/contact-agent", contactagent);
router.post("/get-agent-lead-details", propertyController.getagentleaddetails);
router.post("/forget-password", forgotpassword);
module.exports = router;
