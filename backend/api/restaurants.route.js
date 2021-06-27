import express from "express";
import RestaurantController from "./restaurants.controller.js";
import ReviewsController from "./reviews.controller.js";

const router=express.Router();

router.route("/").get(RestaurantController.apiGetRestaurants);

router.route("/id/:id").get(RestaurantController.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantController.apiGetRestaurantCuisine);

router.route("/review-new").post(ReviewsController.apiPostReview);

router.route("/review-edit").put(ReviewsController.apiUpdateReview)
router.route("/review-delete").delete(ReviewsController.apiDeleteReview);

export default router