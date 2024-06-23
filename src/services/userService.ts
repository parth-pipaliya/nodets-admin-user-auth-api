import { FilterQuery, ProjectionType, QueryOptions, Model } from 'mongoose';
import User, { IUser } from '../models/user';
import { CommonService } from './commonService';
import mongoose from 'mongoose';
import logger from '../utils/logger';

class UserService extends CommonService<IUser> {

}
export default new UserService(User);