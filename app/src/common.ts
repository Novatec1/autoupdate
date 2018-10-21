/**
 * All the common methods are defined inside this class
 */

export default class Common implements common{

    isValidDate(d:any) {
        return d instanceof Date && !isNaN(d.getTime());
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
     
}
