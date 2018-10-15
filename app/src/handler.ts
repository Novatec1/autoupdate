import defination from './defination';
import Common from './common';
import log from './log';
import { callbackify } from 'util';
import { request } from 'https';
import { resolve } from 'url';
const _common  = new Common();

type status= {
    "command_name": string,
    "version":string,
    time:string,
    command: string,
    argument: Array<any>
}
export class Hanlder implements routes {
    public data: Array<status>;
    public blobService:any;
    
    constructor(data:Array<status>,blobService:any){
        this.data = data;
        this.blobService= blobService;
    }
    Map(command:string,argument:Array<any>){
        if (defination[command]) {
            return defination[command];
        }
        return null;
    };
     Execute(callback:any){
            let output=[];
            this.data.forEach((element,index) => {
                let operation = this.Map(element.command,element.argument);
                if(this.validate(element,operation)){
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
    validate(element:any,operation:any) : boolean{
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
