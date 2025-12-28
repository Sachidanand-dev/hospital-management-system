import User from "../models/User.model.js";

/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/users/me
 * @access  Private
 */
export const getMyProfile = async (req, res) => {
  res.json(req.user);
};

/**
 * @desc    Update logged-in user's profile
 * @route   PUT /api/users/me
 * @access  Private
 */
export const updateMyProfile = async (req, res) => {
  const { name } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name) user.name = name;

  await user.save();

  res.json({
    message: "Profile updated successfully",
    user,
  });
};

/**
 * @desc    Admin: get all users
 * @route   GET /api/users
 * @access  Admin only
 */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
