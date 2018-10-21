export interface Runner {
    run(argument:args,callback:any);

}
/**
 * define the required fields for the status arguments
 */
export type args = {
    sourceFileName:string,
    destinationFileName:string,
    destinationPath:string,
    otherCommands:Array<string>,
    containerName:String
}

/**
 * export status file pattern
 */
export type config = {
        "command_name": string,
        "version":string,
        time:string,
        command: string,
        argument: Array<args>
}