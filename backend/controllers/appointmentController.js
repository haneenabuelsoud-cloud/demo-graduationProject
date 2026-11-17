import Appointment from "../models/appointment.js";
import Pet from "../models/pet.js";

// Add Appointment
export const addAppointment = async (req, res, next) => {
  try {
    const { title, description, date, type, pet } = req.body;

    // Check if the pet belongs to the logged-in owner
    const existingPet = await Pet.findOne({
      _id: pet,
      owner: req.owner._id,
    });

    if (!existingPet) {
      return res.status(404).json({
        message: "Pet not found or does not belong to you",
      });
    }

    const appointment = await Appointment.create({
      title,
      description,
      date,
      type,
      pet,
      owner: req.owner._id,
    });

    res.status(201).json({
      message: "Appointment added successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Appointments
export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      owner: req.owner._id,
    }).populate("pet", "name");

    res.status(200).json({
      message: "Appointments retrieved successfully",
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Get Appointment By ID
export const getAppointmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findOne({
      _id: id,
      owner: req.owner._id,
    }).populate("pet", "name");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment retrieved successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Update Appointment
export const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, date, type, status, pet } = req.body;

    // If a new pet ID is provided, check its ownership
    if (pet) {
      const existingPet = await Pet.findOne({
        _id: pet,
        owner: req.owner._id,
      });

      if (!existingPet) {
        return res.status(404).json({
          message: "Pet not found or does not belong to you",
        });
      }
    }

    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: id,
        owner: req.owner._id,
      },
      {
        title,
        description,
        date,
        type,
        status,
        pet,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Appointment
export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      owner: req.owner._id,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
