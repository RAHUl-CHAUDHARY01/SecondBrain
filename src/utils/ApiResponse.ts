class ApiResponse <T> {
    statusCode: number;
    message: String;
    data:T;
    success: Boolean;

    constructor(statusCode : number,
         data: T, message : string ="Success"){
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode <400
    }
}
export {ApiResponse};