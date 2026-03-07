import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
            return /^\d{10}$/.test(v);
          },
          message: (props) =>
            `${props.value} is not a valid 10-digit mobile number!`,
          },
        },

        email: {
          type: String,
          trim: true,
          lowercase: true,
          match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
        },

        aadhaar: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          match: [/^\d{12}$/, "Aadhaar must be a 12-digit number"],
        },

        gender: {
          type: String,
          enum: ["male", "female", "other"],
        },

        age: {
          type: Number,
          min: 1,
          max: 120,
        },

        building: {
          label: {
          type: String,
          required: true,
          },
          value: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Building",
          required: true,
          },
        },

        flat: {
           label: {
          type: String,
          required: true,
          },
          value:{type: mongoose.Schema.Types.ObjectId,
          ref: "Flat",
          required: true,
        }},

        room: {
           label: {
          type: String,
          required: true,
          },
          value:{type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: true,
        }},

        bed: {
           label: {
          type: String,
          required: true,
          },
          value:{type: mongoose.Schema.Types.ObjectId,
          ref: "Bed",
          required: true,
        }},

        joinedDate: {
          type: Date,
          required: true,
        },

        expectedLeaveDate: {
          type: Date,
        },

        document: {
          type: String,
    },

    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
    },


     isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tenant", tenantSchema);