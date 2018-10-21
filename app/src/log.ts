class logImpl implements LOG{
    //implementation of each function is different even though body is same, this is on speculation that in future the defination for each method may differ
    
    /**
     * error();
     * @param string 
     * @param any 
     * expects a message and any object like error stack or details due to which error occured
     */
    error(message:string,stack={}):void{
        console.log(`ERROR,${new Date()}, ${message} `,stack);
    }
    /**
     * info();
     * @param string 
     * @param any 
     * expects a message and any object like error stack or other information
     */
    info(message:string,stack={}):void{
        console.log(`INFO,${new Date()}, ${message} `,stack);
    }
    /**
     * debug();
     * @param string 
     * @param any 
     * expects a message and any object like error stack or other information
     */
    debug(message:string,stack={}):void{
        console.log(`DEBUG,${new Date()}, ${message} `,stack);
    }
    /**
     * warn();
     * @param string 
     * @param any 
     * expects a message and any object like error stack or other information
     */
    warn(message:string,stack={}):void{
        console.log(`WARN,${new Date()}, ${message} `,stack);
    }
    /**
     * report();
     * @param string 
     * @param any 
     * report details to the cloud for details
     */
    report(message:string,stack={}):void{

    }

}
/**
 * Interface which holds methods for loggin implementation 
 * 
 */
interface LOG {
    
    error(string,any);
    info(string,any);
    debug(string,any);
    warn(string,any);
    report(string,any)
}
var log:LOG = new logImpl()
export default log;