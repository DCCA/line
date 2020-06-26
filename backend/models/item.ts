import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

function statusValidator(status: string) {
  switch (status) {
    case 'scheduled':
      return true;
    case 'waiting':
      return true;
    case 'picked':
      return true;
    default:
      return false;
  }
}

interface IItem extends mongoose.Document {
  name: string;
  pickerName: string;
  pickerEmail: string;
  pickUpDate: Date;
  states: string;
  userId: string;
}

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pickerName: {
      type: String,
      required: true,
    },
    pickerEmail: {
      type: String,
      required: true,
    },
    pickUpDate: {
      type: Date,
      required: true,
    },
    states: {
      type: String,
      default: 'scheduled',
      validate: statusValidator,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model<IItem>('Item', itemSchema);
