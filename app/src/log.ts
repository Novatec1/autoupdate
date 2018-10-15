class logImpl implements LOG{
    //implementation of each function is different even though body is same, this is on speculation that in future the defination for each method may differ
    error(message:string,stack={}):void{
        console.log(`ERROR,${new Date()}, ${message} `,stack);
    }
    info(message:string,stack={}):void{
        console.log(`INFO,${new Date()}, ${message} `,stack);
    }
    debug(message:string,stack={}):void{
        console.log(`DEBUG,${new Date()}, ${message} `,stack);
    }
    warn(message:string,stack={}):void{
        console.log(`WARN,${new Date()}, ${message} `,stack);
    }
}
interface LOG {
    error(string,any);
    info(string,any);
    debug(string,any);
    warn(string,any);
}
var log:LOG = new logImpl()
export default log;