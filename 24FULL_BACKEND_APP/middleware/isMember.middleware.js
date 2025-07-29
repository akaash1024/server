const isMember = async (req, res, next) => {
    try {
        // console.log(req.user);
        const isAdmin = req.user.isAdmin;
        if (isAdmin) {
            return res
                .status(403)
                .json({ message: "Access denied. Admins not allowed." });
        }
        //  res.status(200).json({ message: req.user.isAdmin });
        // If user is an admin, proceed to the next middleware
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isMember;
