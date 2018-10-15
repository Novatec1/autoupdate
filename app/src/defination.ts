/**
 * import the defination functions here !
 */
import {download} from './functions/download';
import {gitupdate} from './functions/gitupdate';

/**
 * map the functions with a command name
 */
const defination  = {
    "download" : download,
    "gitupdate" : gitupdate
}
export default defination;