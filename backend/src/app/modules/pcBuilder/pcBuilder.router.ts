import express from "express";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { PcBuilderValidation } from "./pcBuilder.validation";
import { PcBuilderController } from "./pcBuilder.controller";

const router = express.Router();

router.post(
  "/saveBuildPc",
  zodValidationRequest(PcBuilderValidation.pcBuilderSchema),
  PcBuilderController.buildPc
);

router.get("/getSavedPCs/:id", PcBuilderController.getBuildPcByUserId);

router.get("/getSavedPCByID/:id", PcBuilderController.getBuildPcById);

router.delete("/deleteBuild/:id", PcBuilderController.deleteBuild);

export const PcBuilderRouter = router;
