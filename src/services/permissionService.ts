import Permission, { IPermission } from '../models/permission';
import { CommonService } from './commonService';

class PermissionService extends CommonService<IPermission> {
 
}
export default new PermissionService(Permission);