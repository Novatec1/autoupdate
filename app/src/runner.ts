export interface Runner {
    run(argument:args,callback:any);

}
/**
 * define the required fields for the status file
 */
export type args = {
    sourceFileName:string,
    destinationFileName:string,
    destinationPath:string,
    otherCommands:Array<string>,
    containerName:String
}
