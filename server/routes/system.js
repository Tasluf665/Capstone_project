const express = require("express");
const { jwtDecode } = require("jwt-decode");
const router = express.Router();
const User = require("../models/user"); // Adjust the path as necessary

router.post("/change-role/", async (req, res) => {
  try {
    const { role, uid } = req.query;
    const adminToken = jwtDecode(req.headers.authorization?.split(" ")[1]);

    if (!adminToken || !adminToken.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user is an admin
    const user = await User.findById(adminToken.id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    // Validate the role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Find the user to change the role
    const userToChange = await User.findById(uid);
    if (!userToChange) {
      return res.status(404).json({ message: "User not found" });
    }
    // Change the user's role
    userToChange.role = role;
    await userToChange.save();

    res.status(200).json({
      message: "User role changed successfully",
    });
  } catch (error) {
    console.error("Error in /api/system/change-role route:", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
});

module.exports = router;
