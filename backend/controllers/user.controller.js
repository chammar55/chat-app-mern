import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, resp) => {
  try {
    const loggedInUserId = req.user._id;
    //  $ne: loggedInUserId mean that show all user exept the loggedIn user. cuz we want to show all users in sidebar from which loogedIn user can chat with them.
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    resp.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    resp.status(500).json({ error: "Internal server error" });
  }
};
