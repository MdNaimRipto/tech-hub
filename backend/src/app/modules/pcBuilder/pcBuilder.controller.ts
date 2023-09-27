import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PcBuilderService } from "./pcBuilder.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

// Build PC
const buildPc = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  await PcBuilderService.buildPc(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "PC Build Saved.",
    data: null,
  });
});

// Get Saved Pc By User ID
const getBuildPcByUserId = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const savedBuilds = await PcBuilderService.getBuildPcByUserId(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Saved Build's Retrieved.",
    data: savedBuilds,
  });
});

// Get Saved Pc By ID
const getBuildPcById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const savedBuild = await PcBuilderService.getBuildPcById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Saved Build Retrieved.",
    data: savedBuild,
  });
});

// Delete Build
const deleteBuild = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  const savedBuild = await PcBuilderService.deleteBuild(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Build Deleted.",
    data: savedBuild,
  });
});

export const PcBuilderController = {
  buildPc,
  getBuildPcByUserId,
  getBuildPcById,
  deleteBuild,
};
