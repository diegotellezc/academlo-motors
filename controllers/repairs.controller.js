const Repair = require('../models/repairs.model');

exports.findRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
  });

  res.json({
    results: repairs.length,
    status: 'success',
    message: 'Pending repairs were found',
    repairs,
  });
};

//POST
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const repair = await Repair.create({
      date,
      userId,
    });

    res.status(201).json({
      message: 'Motorcycle repair created successfully',
      repair,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};

exports.findRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const oneRepair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!oneRepair) {
      return res.status(404).json({
        status: 'error',
        message: `The repair with id: ${id} was not found!`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'repair found',
      oneRepair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `The repair with id: ${id} was not found!`,
      });
    }

    await repair.update({ status: 'completed' });

    res.status(200).json({
      status: 'success',
      message: 'Repair updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      const completedRepair = await Repair.findOne({
        where: {
          id,
          status: 'completed',
        },
      });

      if (completedRepair) {
        return res.status(404).json({
          status: 'error',
          message: `The repair with id: ${id} cannot be canceled because it has already been completed!`,
        });
      }

      return res.status(404).json({
        status: 'error',
        message: `The repair with id: ${id} was not found!`,
      });
    }

    await repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      message: 'Repair deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
};
