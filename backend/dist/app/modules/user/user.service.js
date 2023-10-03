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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_schema_1 = require("./user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../../config/config"));
const lodash_1 = require("lodash");
const user_constant_1 = require("./user.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
//* User Register
const userRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contactNumber } = payload;
    // Check if the email or contact already exists
    const isExistsUser = yield user_schema_1.Users.findOne({
        $or: [{ email }, { contactNumber }],
    });
    if (isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Email or Contact Already Exists");
    }
    // Generate UID
    const uid = (0, user_utils_1.generateUID)();
    // Check UID Exists or Not
    const isUIDExists = yield user_schema_1.Users.findOne({ uid: uid });
    if (isUIDExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "User Already Exists");
    }
    // Save UID
    payload.uid = uid;
    // Create User
    const user = yield user_schema_1.Users.create(payload);
    const { _id } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: _id,
    }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    return {
        accessToken,
    };
});
//* User Login
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExists = yield user_schema_1.Users.findOne({ email: email }, {
        _id: 1,
        password: 1,
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email Or Password");
    }
    const checkPassword = yield bcrypt_1.default.compare(password, isExists.password);
    if (!checkPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email Or Password");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isExists._id,
    }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    return {
        accessToken,
    };
});
const getAuthenticatedUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = decodedToken.id;
    const user = yield user_schema_1.Users.findById({ _id: userId }, {
        password: 0,
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    return user;
});
//* Get All User Api [Admin Api]
const getAllUser = (filters, paginationOptions, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    //
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    //
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const users = yield user_schema_1.Users.find(checkAndCondition, {
        _id: 0,
        name: 1,
        email: 1,
        contactNumber: 1,
        userProfile: 1,
    })
        .lean()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (users.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Users Found to Show!");
    }
    const total = yield user_schema_1.Users.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: users,
    };
});
//* User Update
const updateUser = (userID, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isExistsUser = yield user_schema_1.Users.findById({ _id: userID });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    const { userRole, uid } = payload, updatePayload = __rest(payload, ["userRole", "uid"]);
    if (userRole !== undefined || uid !== undefined) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Please Try Again.");
    }
    if (payload.email) {
        const isExists = yield user_schema_1.Users.findOne({ email: payload.email });
        if (isExists) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Email Already Exists! Try Another One.");
        }
        updatePayload.email = payload.email;
    }
    if (payload.password) {
        const isPreviousPass = yield bcrypt_1.default.compare(payload.password, isExistsUser.password);
        if (isPreviousPass) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "New Password Cannot be The Previous Password");
        }
        const newPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.salt_round));
        updatePayload.password = newPassword;
    }
    const result = yield user_schema_1.Users.findOneAndUpdate({ _id: userID }, updatePayload, {
        new: true,
    });
    const updatedUser = (0, lodash_1.omit)(result === null || result === void 0 ? void 0 : result.toObject(), ["password"]);
    return updatedUser;
    // return result;
});
//* Forgot Password Part-1 Find user via email
const findUserForForgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.Users.findOne({ email: email }, {
        _id: 0,
        email: 1,
    }).lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    return user;
});
//* Forgot Password Part-2
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExistsUser = yield user_schema_1.Users.findOne({ email: email });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    if (!password || !email) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password Update Failed!. Try Again.");
    }
    const isPreviousPass = yield bcrypt_1.default.compare(password, isExistsUser.password);
    if (isPreviousPass) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "New Password Cannot be The Previous Password");
    }
    const newPass = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_round));
    payload.password = newPass;
    yield user_schema_1.Users.findOneAndUpdate({ email: email }, payload, {
        new: true,
    });
    return null;
});
//* Delete User
const deleteUser = (userID, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isExists = yield user_schema_1.Users.findById({ _id: userID });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    yield user_schema_1.Users.findOneAndDelete({ _id: userID }, {
        new: true,
    });
    return null;
});
exports.UserService = {
    userRegister,
    userLogin,
    getAuthenticatedUser,
    getAllUser,
    updateUser,
    findUserForForgotPassword,
    forgotPassword,
    deleteUser,
};
