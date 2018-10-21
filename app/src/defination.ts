/**
 * Here all the Actions are defined. Each Action is associated to a command which can be used in status file
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