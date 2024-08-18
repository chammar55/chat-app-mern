export const getUsersForSidebar = async (req, resp) => {
  try {
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    resp.status(500).json({ error: "Internal server error" });
  }
};
