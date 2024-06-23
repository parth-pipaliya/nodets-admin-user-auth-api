import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IRole extends Document {
    name: string;
    value: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const roleSchema = new Schema<IRole>({
    name: { type: String, required: true },
    value: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true },
    deletedAt: { type: Date, default: null },
},{
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    versionKey: false, // Disable the `__v` field
});


export default model<IRole>('Role', roleSchema);