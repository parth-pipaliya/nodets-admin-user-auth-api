import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    comparePassword(password: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null },
},{
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    versionKey: false, // Disable the `__v` field
});

adminSchema.pre<IAdmin>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

adminSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default model<IAdmin>('Admin', adminSchema);