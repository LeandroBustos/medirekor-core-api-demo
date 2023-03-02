class Logger {
    info(msg: string, err?: any) {
        console.log(msg, err)
    }

    warn(msg: string, err?: any) {
        console.warn(msg, err)
    }

    error(msg: string, err?: any) {
        console.error(msg, err)
    }
}

export default new Logger()