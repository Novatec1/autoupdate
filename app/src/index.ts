/**
 * Read the configuration
 * check for the environment variable
 * Download the status file and trigger the event
 */
import * as  fs from 'fs';
const ini = require('ini');
import log from './log';
import * as path from 'path';
import { rejects } from 'assert';
import {Handler} from './handler';
import { callbackify } from 'util';
//get the config file path
const config_path = process.argv[2] || "../configuration.ini";
//check if file exist
if(!fs.existsSync(config_path)){
    log.error(`File may not exist. ! please check ${config_path}`,{});
    process.exit(1);
}
//parse the ini file
let config = ini.parse(fs.readFileSync(config_path,'utf-8'));
//check for the required field
if(!config.blob.AZURE_STORAGE_CONNECTION_STRING || !config.blob.status_file || !config.blob.containername){
    log.error(`expecting config to contain blob.AZURE_STORAGE_CONNECTION_STRING and blob.status_file values`,{})
    process.exit(1);
}
//add environment variable from config file
process.env.AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || config.blob.AZURE_STORAGE_CONNECTION_STRING;

//load storage once connection_string is stored in environment variable
const  storage = require('azure-storage');

const blobService = storage.createBlobService();

//Download the status file and check if status is valid
blobService.getBlobToStream(config.blob.containername, config.blob.status_file, fs.createWriteStream('output.json'), function(error, result, response) {
    if (error) {
        log.error("encounterd an error while fetching status file",error);
    }
    else{
        log.info("status file fetched",result);
        let temp = fs.readFileSync('output.json',"utf8");
        try {
            let STATUS = JSON.parse(temp.toString());
            //Call the handler and request for execution
            let handle = new Handler(STATUS,blobService);
            handle.Execute((result)=>{
                console.log(result);
            })
        }
        catch(exp){
            log.error("Status file may not be a json file", exp);
        }
    }
});

