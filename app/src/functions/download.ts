import {Runner,args} from '../runner';
import * as fs from 'fs';
import log from '../log';
import { exec } from 'child_process';
import { callbackify } from 'util';

export class download implements Runner {
    private blobService:any;
    private TIMEOUT : number = 60000;
    constructor(blobService:any){
        this.blobService = blobService;
    }
    run(arg:args,callback:any){
        
        this.blobService.getBlobToStream(arg.containerName,arg.sourceFileName, fs.createWriteStream(arg.destinationPath+arg.sourceFileName),function (error, result, response) {
            if (error) {
                log.error("encounterd an error while fetching status file",error);
                return false;
            }
            let output= [];
            arg.otherCommands.forEach( (cmd,index)=>{
                exec(cmd,{timeout:60000}, (err,stdout,stderr)=>{
                    output.push(`output for ${cmd},\n ${JSON.stringify(stdout)}, \n ${JSON.stringify(stderr)}`);
                    if(index >= arg.otherCommands.length -1){
                        callback(output);
                    }
                });
            })
        });

    }
    
}

                