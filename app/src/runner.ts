export interface Runner {
    run(argument:args,callback:any);

}
export type args = {
    sourceFileName:string,
    destinationFileName:string,
    destinationPath:string,
    otherCommands:Array<string>,
    containerName:String
}
