import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.jwt;

    // If there's no token, return unauthorized error
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Fixed: added correct argument for verification

    // If token is invalid or expired
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Find the user based on the decoded userId and exclude password
    const user = await User.findById(decoded.userId).select("-password"); // Fixed: corrected chaining and reference

    // If no user is found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Error in protected middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
