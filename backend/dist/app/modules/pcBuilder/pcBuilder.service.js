"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcBuilderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_schema_1 = require("../user/user.schema");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pcBuilder_schema_1 = require("./pcBuilder.schema");
const pcBuilder_populatePaths_1 = require("./pcBuilder.populatePaths");
const config_1 = __importDefault(require("../../../config/config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const pcBuilder_utils_1 = require("./pcBuilder.utils");
const buildPc = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { userID } = payload;
    const isUserExists = yield user_schema_1.Users.findById({ _id: userID }, { _id: 1 }).lean();
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does Not Exist's!");
    }
    const userBuildCount = yield pcBuilder_schema_1.PcBuilder.countDocuments({ userID });
    if (userBuildCount >= 5) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User can only save 5 PC builds.");
    }
    const code = (0, pcBuilder_utils_1.generateBuildCode)();
    const isExistsCode = yield pcBuilder_schema_1.PcBuilder.findOne({ code: code });
    if (isExistsCode) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Product Already Exists! Try Again");
    }
    payload.code = code;
    const pc = yield pcBuilder_schema_1.PcBuilder.create(payload);
    return pc;
});
const getBuildPcByUserId = (userID, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const savedPCs = yield pcBuilder_schema_1.PcBuilder.find({ userID }, {
        _id: 1,
        code: 1,
        buildName: 1,
        savedTime: 1,
    }).populate({
        path: "userID",
        select: "-_id name",
    });
    if (!savedPCs.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "0 Build Found!");
    }
    return savedPCs;
});
const getBuildPcById = (buildId, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const savedPC = yield pcBuilder_schema_1.PcBuilder.findById({ _id: buildId }).populate(pcBuilder_populatePaths_1.pcBuilderPopulatePaths);
    if (!savedPC) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Build Does Not Exists!");
    }
    return savedPC;
});
const deleteBuild = (buildId, userID, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isBuildExists = yield pcBuilder_schema_1.PcBuilder.findById({ _id: buildId }, { userID: 1 });
    if (!isBuildExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Build Does Not Exist's!");
    }
    if (userID !== String(isBuildExists.userID)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Failed To Delete");
    }
    yield pcBuilder_schema_1.PcBuilder.findOneAndDelete({ _id: buildId }, {
        new: true,
    });
    return null;
});
exports.PcBuilderService = {
    buildPc,
    getBuildPcByUserId,
    getBuildPcById,
    deleteBuild,
};
