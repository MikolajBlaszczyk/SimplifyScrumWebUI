import { time } from "console"

export class DateConverter{
    public static convertDateToTimeString(date: Date){
        const hr = date.getHours().toString().padStart(2, '0')
        const min = date.getMinutes().toString().padStart(2, '0')
        const sec = date.getSeconds().toString().padStart(2, '0')

        return `${hr}:${min}:${sec}`
    }

    public static convertTimeStringToDate(timeStr: string){
        if(timeStr.length != 8)
            throw Error("Incorrect time string format")

        const hr = parseInt(timeStr.substring(0,2))
        const min = parseInt(timeStr.substring(3,5))
        const sec = parseInt(timeStr.substring(6))

        return new Date(0,0,0,hr,min,sec)
    }
}

export class DateComparer {

    static areTheSameDay(first: Date, second: Date) {
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        )
    }
}