import { errorResponse } from "../utils/responseHelper.js";
import User from "../modules/user/user.model.js"

const isAdminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    if (user.role !== 'admin') {
      return errorResponse(res, 'Access denied: Admin only', 403);
    }

    next();
  } catch (err) {
    return errorResponse(res, 'Error checking user role', 500);
  }
};

export default isAdminMiddleware;
