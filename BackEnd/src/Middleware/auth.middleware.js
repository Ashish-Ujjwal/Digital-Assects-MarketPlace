import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // Try getting token from cookie or Authorization header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  // If token not present
  if (!token) {
    throw new ApiError("Access token missing. Please login again.", 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    // Find user by ID and exclude sensitive fields
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError("User not found.", 404);
    }

    // Attach user to request for further use
    req.user = user;
    next();
  } catch (err) {
    // Token is invalid or expired
    const isTokenExpired = err.name === "TokenExpiredError";
    const isTokenInvalid = err.name === "JsonWebTokenError";

    const message = isTokenExpired
      ? "Access token expired. Please refresh or login again."
      : isTokenInvalid
      ? "Invalid access token."
      : "Authentication failed.";

    const statusCode = isTokenExpired || isTokenInvalid ? 401 : 500;

    throw new ApiError(message, statusCode);
  }
});
