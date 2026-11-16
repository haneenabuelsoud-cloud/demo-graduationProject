import Pet from "../models/pet.js";

// 1. Add New Pet
export const addPet = async (req, res, next) => {
  try {
    const { name, age, gender, color } = req.body;

    const pet = await Pet.create({
      name,
      age,
      gender,
      color,
      owner: req.owner._id,
    });

    return res.status(201).json({
      message: "Pet added successfully",
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get All Pets Of Logged-in Owner
export const getAllPets = async (req, res, next) => {
  try {
    const pets = await Pet.find({
      owner: req.owner._id,
    });

    return res.status(200).json({
      results: pets.length,
      data: pets,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Get Pet By ID
export const getPetById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pet = await Pet.findOne({
      _id: id,
      owner: req.owner._id,
    });

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    return res.status(200).json({
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};

// 4. Update Pet
export const updatePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, gender, color } = req.body;

    const pet = await Pet.findOneAndUpdate(
      {
        _id: id,
        owner: req.owner._id,
      },
      {
        name,
        age,
        gender,
        color,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    return res.status(200).json({
      message: "Pet updated successfully",
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};

// 5. Delete Pet
export const deletePet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pet = await Pet.findOneAndDelete({
      _id: id,
      owner: req.owner._id,
    });

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    return res.status(200).json({
      message: "Pet deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
