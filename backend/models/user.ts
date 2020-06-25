import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  items: string[];
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model<IUser>('User', userSchema);
