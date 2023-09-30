import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PcBuilderService } from "./pcBuilder.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Build PC
const buildPc = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const token = verifyAuthToken(req);

  await PcBuilderService.buildPc(payload, token);

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
  const token = verifyAuthToken(req);

  const savedBuilds = await PcBuilderService.getBuildPcByUserId(id, token);

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
  const token = verifyAuthToken(req);

  const savedBuild = await PcBuilderService.getBuildPcById(id, token);

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
  const token = verifyAuthToken(req);

  const savedBuild = await PcBuilderService.deleteBuild(id, userId, token);

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
