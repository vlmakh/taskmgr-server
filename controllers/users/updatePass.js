const { User, joiUpdatePassSchema } = require("../../models/userSchema");
const bcrypt = require("bcryptjs");

const updatePass = async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;

  try {
    const { error } = joiUpdatePassSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const hashNewPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.findByIdAndUpdate(user._id, { password: hashNewPassword });

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updatePass;
