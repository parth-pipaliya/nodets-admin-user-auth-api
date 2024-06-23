import Admin, { IAdmin } from '../models/admin';
import { CommonService } from './commonService';

class AdminService extends CommonService<IAdmin> {
 
}

export default new AdminService(Admin);
