const User = require('../../models/User');

async function getAllUsers() {
  return User.find({ deletedAt: null }).populate('role');
}

async function getUserById(id) {
  return User.findOne({ _id: id, deletedAt: null }).populate('role');
}

async function createUser(payload) {
  const user = new User(payload);
  return user.save();
}

async function updateUser(id, payload) {
  return User.findOneAndUpdate(
    { _id: id, deletedAt: null },
    payload,
    { new: true }
  ).populate('role');
}

async function softDeleteUser(id) {
  return User.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() },
    { new: true }
  );
}

async function setUserStatusByEmailAndUsername(email, username, status) {
  const user = await User.findOne({ email, username });
  if (!user) {
    return null;
  }

  user.status = status;
  await user.save();
  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
  setUserStatusByEmailAndUsername
};
