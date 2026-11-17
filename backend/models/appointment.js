import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Appointment title is required"],
    },

    description: {
      type: String,
    },

    date: {
      type: Date,
      required: [true, "Appointment date is required"],
    },

    type: {
      type: String,
      enum: ["Vaccination", "Medical", "Medication", "Grooming", "Other"],
      required: [true, "Appointment type is required"],
    },

    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
  },
  { timestamps: true },
);

export default model("Appointment", appointmentSchema);
