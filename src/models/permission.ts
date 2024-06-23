import { Schema, model, Document } from 'mongoose';

export interface IPermission extends Document {
    name: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const permissionSchema = new Schema<IPermission>({
    name: { type: String, required: true },
    value: { type: String, required: true, unique: true },
    deletedAt: { type: Date, default: null },
},{
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    versionKey: false, // Disable the `__v` field
});


export default model<IPermission>('Permission', permissionSchema);