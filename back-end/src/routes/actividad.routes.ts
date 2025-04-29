import { Router } from "express";
import { createActivity, getActivities, getActivityById } from "../controllers/actividad.controller";
import { protect } from "../middlewares/auth.middleware";

const activitiesRouter = Router();

activitiesRouter.get("/activities", protect, getActivities);

activitiesRouter.post("/create-activity", protect, createActivity);

activitiesRouter.get("/activity/:id", protect, getActivityById);

export default activitiesRouter;