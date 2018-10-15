export default class Common{

    isValidDate(d:any) {
        return d instanceof Date && !isNaN(d.getTime());
    }
}
interface common{
    isValidDate(any):boolean;
     
}
