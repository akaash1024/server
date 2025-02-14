const Contact_Database = require("../models/contact.model");
const User_Database = require("../models/user.model");

// *-------------------------------
//* getAllUsers Logic 📝
// *-------------------------------

const getAllUsers = async (req, res) => {
  try {
    const users = await User_Database.find({}, { password: 0 });
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* single user Logic 📝
// *-------------------------------

// const getUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await User_Database.findOne({ _id: id }, { password: 0 });
//     return res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User_Database.findById(id, { password: 0 });

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* user update Logic 📝
// *-------------------------------
// ! for future while optimizing
// const updateUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedUserData = req.body;

//     const updatedData = await User_Database.updateOne(
//       // ! need to test findbyidandupdate
//       { _id: id },
//       { $set: updatedUserData }
//     );
//     return res.status(200).json(updatedData);
//   } catch (error) {
//     next(error);
//   }
// };

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User_Database.findByIdAndUpdate(id,updatedUserData,{ new: true });

    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* user delete Logic 📝
// *-------------------------------

// const deleteUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await User_Database.deleteOne({ _id: id });
//     return res.status(200).json({ message: "User Deleted Successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await User_Database.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* getAllContacts Logic 📝
// *-------------------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact_Database.find({});
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* contacts delete Logic 📝
// *-------------------------------

// const deleteContactById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Contact_Database.deleteOne({ _id: id });
//     return res.status(200).json({ message: "Contact Deleted Successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

const deleteContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact_Database.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res
      .status(200)
      .json({ message: "Contact deleted successfully", deletedContact });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};
