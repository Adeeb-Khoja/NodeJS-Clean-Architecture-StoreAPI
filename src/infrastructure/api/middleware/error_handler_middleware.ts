
export const errorHandlerMiddleware = async (err: any, req: any, res: any, next: any) => {
    console.error(err)
    return res.status(500).json({ msg: "Something went wrong! Server error occurred", error: err.message })
}