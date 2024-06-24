import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rooms: [
      {
        type: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
    availableDate: { type: Date, required: true },
    minimumTerm: { type: String },
    maximumTerm: { type: String },
    billsIncluded: { type: Boolean },
    amenities: [{ type: String }],
    imageUrl: [{ url: { type: String } }],
  },
  { timestamps: true }
);

const roomModel = mongoose.model("rooms", roomSchema);

export { roomModel };
