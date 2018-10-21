import defination from './defination';
import Common from './common';
import log from './log';

const _common  = new Common();
import {args,config} from './runner';

/**
 * Handler();
 * Responsible for executing each command provided in the status file
 * @param data Aarray<config> expects the configuration file
 * @param blobService Object expects the blobservice objects for blob service API.
 */
export class Handler implements routes {
    public data: Array<config>;
    public blobService:any;
    
    constructor(data:Array<config>,blobService:any){
        this.data = data;
        this.blobService= blobService;
    }
    /**
     * Map();
     * check if command is mapped to any function or not. if mapped returns the function
     * @param command {String} command_name 
     * @param argument {Array<args>} list of arguments for the command. args pattern defined in runner.ts
     * 
     */
    Map(command:string,argument:Array<any>){
        if (defination[command]) {
            return defination[command];
        }
        return null;
    };
    /**
     * Execute();
     * Execute each command defined in the file
     * @param callback executes once all commands executed
     */
     Execute(callback:any){
            let output=[];
            this.data.forEach((element,index) => {
                let operation = this.Map(element.command,element.argument);
                if(this._validate(element,operation)){
                    const OPR = new operation(this.blobService);
                    OPR.run(element.argument,function(result){
                        if(result){
                            //change the version
                            process.env[element.command_name]= element.version;
                            log.info(`sucessfully executed command ${element.command_name}`, result);
                            output.push(result);
                        }
                    });
                       
                }
                else{
                    console.log("failed to validate")
                }
                if(this.data.length -1 <=index){
                    callback(output);
                }
            });
    }
    /**
     * 
     * @param element each command passed in the status 
     * @param operation operation to perform on the command
     */
    _validate(element:any,operation:any) : boolean{
        //Check if timestamp expired
        let date = new Date(parseInt(element.time));
        if (!_common.isValidDate(date) || (new Date()).getTime() < date.getTime()){
            console.log("failed to validate date");
            return false;
        }
        //check if version is greater than current version
        process.env[element.command_name] = process.env[element.command_name] || element.version;
        if(process.env[element.command_name] > element.version){
            return false;
        }
        //check if command exist
        if(operation == null){
            return false;
        }
        return true;
    }

}


interface routes {

    Map(string,Array);
    Execute(callback:any):any;
}
