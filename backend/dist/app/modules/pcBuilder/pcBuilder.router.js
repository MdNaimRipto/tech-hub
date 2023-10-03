"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcBuilderRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const pcBuilder_validation_1 = require("./pcBuilder.validation");
const pcBuilder_controller_1 = require("./pcBuilder.controller");
const router = express_1.default.Router();
router.post("/saveBuildPc", (0, zodValidationRequest_1.default)(pcBuilder_validation_1.PcBuilderValidation.pcBuilderSchema), pcBuilder_controller_1.PcBuilderController.buildPc);
router.get("/getSavedPCs/:id", pcBuilder_controller_1.PcBuilderController.getBuildPcByUserId);
router.get("/getSavedPCByID/:id", pcBuilder_controller_1.PcBuilderController.getBuildPcById);
router.delete("/deleteBuild/:id", pcBuilder_controller_1.PcBuilderController.deleteBuild);
exports.PcBuilderRouter = router;
