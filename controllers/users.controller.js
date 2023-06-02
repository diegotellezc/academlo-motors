const User = require('../models/users.model');

exports.findUsers = async (req, res) => {
  const users = await User.findAll({
    where: { status: 'available' },
  });

  res.json({
    results: users.length,
    status: 'success',
    message: 'Users were found',
    users,
  });
};

//POST
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(404).json({
        status: 'error',
        message: `There is already a user created in the database with the email: ${email}`,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const oneUser = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!oneUser) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} was not found!`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'user found',
      oneUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} was not found!`,
      });
    }

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      message: 'User updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} was not found!`,
      });
    }

    await user.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      message: 'User deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};
