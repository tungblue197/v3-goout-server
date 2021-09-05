type RensponderType = {
    status?: number,
    message?: string,
    success?:boolean,
    data?: any
}
export default {
    successRespone: ({status = 200, message = 'Thành công', success = true, data }: RensponderType) => {
        return {
            status,
            message,
            success,
            data
        }
    }
}