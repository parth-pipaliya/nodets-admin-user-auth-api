import Role, { IRole } from '../models/role';
import { CommonService } from './commonService';

class RoleService extends CommonService<IRole> {
 
}
export default new RoleService(Role);