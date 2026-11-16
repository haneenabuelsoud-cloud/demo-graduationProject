import { Schema, model } from "mongoose";

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Pet name is required"],
    },

    age: {
      type: Number,
      required: [true, "Pet age is required"],
      min: [0, "Age cannot be negative"],
    },

    gender: {
      type: String,
      required: [true, "Pet gender is required"],
    },

    color: {
      type: String,
      required: [true, "Pet color is required"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
  },
  { timestamps: true },
);

export default model("Pet", petSchema);
