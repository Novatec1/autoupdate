/**
 * All the common methods are defined inside this class
 */
const ini = require('ini');
import * as  fs from 'fs';

export default class Common implements common{

    isValidDate(d:any) {
        return d instanceof Date && !isNaN(d.getTime());
    }
    getIni(path){
        return ini.parse(fs.readFileSync(path,'utf-8'));
    }
    setIni(config:any,path:string):void{
        fs.writeFileSync(path, ini.stringify(config));

    }
}
/**
 * Declare all the common function which may be required by multiple methods
 */
interface common{

    /**
     * isValidateDate(d:Date);
     * checks if the Date object is a valid or not. 
     * @param d {Date}  pass an Date object to the function
     * @returns boolean 
     */
    isValidDate(any):boolean;
     /**
     * getInit(d:Date);
     * Read the ini file and return the ini object
     * @param path {string}  path of the ini file
     * @returns ini object 
     */
    getIni(path:string):any;
     /**
     * setIni(config:object,path:string);
     * write the updated configuration to the ini file
     * @param config {ini object}  contains the update config file
     * @param path {string} path of the ini file 
     */
    setIni(config:any,path:string):void;
     
}
