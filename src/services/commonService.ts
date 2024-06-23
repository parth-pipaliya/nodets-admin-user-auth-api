import { Model, Document, FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import logger from '../utils/logger';

export class CommonService<T extends Document> {
    constructor(private model: Model<T>) {}

    async createData(data: Partial<T>): Promise<T> {
        const document = new this.model(data);
        await document.save();
        logger.info(`${this.model.modelName} created successfully with id: ${document._id}`);
        return document;
    }

    async updateData(id: string, updateData: Partial<T>): Promise<T | null> {
        const document = await this.model.findByIdAndUpdate(id, updateData, { new: true });
        if (!document) {
            logger.warn(`${this.model.modelName} update failed. No document found with id: ${id}`);
            throw new Error(`${this.model.modelName} not found`);
        }
        logger.info(`${this.model.modelName} updated successfully with id: ${id}`);
        return document;
    }

    async deleteData(id: string): Promise<T | null> {
        const document = await this.model.findByIdAndDelete(id);
        if (!document) {
            logger.warn(`${this.model.modelName} deletion failed. No document found with id: ${id}`);
            throw new Error(`${this.model.modelName} not found`);
        }
        logger.info(`${this.model.modelName} deleted successfully with id: ${id}`);
        return document;
    }

    async getById(id: string): Promise<T | null> {
        const document = await this.model.findById(id);
        if (!document) {
            logger.warn(`${this.model.modelName} retrieval failed. No document found with id: ${id}`);
            throw new Error(`${this.model.modelName} not found`);
        }
        logger.info(`${this.model.modelName} retrieved successfully with id: ${id}`);
        return document;
    }

    async selectData(filter:{}, page = 1, limit = 10): Promise<T[]> {
        const options = {
          skip: (page - 1) * limit,
          limit: limit,
        };
      
        const documents = await this.model.find(filter, null, options);
        logger.info(`${this.model.modelName}s selected successfully with filter: ${JSON.stringify(filter)}`);
        return documents;
    }

    async countData(filter:{}): Promise<number> {
        const count = await this.model.countDocuments(filter);
        logger.info(`${this.model.modelName} count with filter: ${JSON.stringify(filter)}`);
        return count;
    }
}
