import mongoose, { Schema, type Document } from "mongoose";
import type { LeadSource, LeadStatus } from "../constants";

export interface LeadDocument extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New"
    },
    source: {
      type: String,
      enum: ["Website", "Instagram", "Referral"],
      default: "Website"
    }
  },
  { timestamps: true }
);

export const Lead = mongoose.model<LeadDocument>("Lead", leadSchema);
