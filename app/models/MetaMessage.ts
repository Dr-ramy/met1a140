import { Schema, Document, model, models } from "mongoose";

export interface IMetaMessage extends Document {
  username: string;
  content: string;
  createdAt: Date;
}

const MetaMessageSchema = new Schema<IMetaMessage>(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const MetaMessage =
  models.MetaMessage || model<IMetaMessage>("MetaMessage", MetaMessageSchema);

export default MetaMessage;
