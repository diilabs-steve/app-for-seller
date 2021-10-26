/**
 * Date 객체에 날짜를 더하는 메서드
 */
 export const addDays = (date, dates) => {
    const add = 86400000 * dates;
    const rs = new Date(date.getTime() + add);
    return rs;
}

/**
 * Date객체를 넣으면 요일을 얻는 메서드 
 */
export const getDayOfWeek = (date) => {
    const dayIdx = date.getDay();
    const korDayOfWeek = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
    ]
    return korDayOfWeek[dayIdx];
}

export const dateTimeParser = (delivery_time) => {
    let time = "";
    if (delivery_time) {
        const rs = delivery_time.split(":");
        const first = rs[0];
        time += (first[first.length - 2] + first[first.length - 1] + ":" + rs[1]);
    }
    return time
}

/**
 * 
 * Date 객체를 Custom 한 Format을 가진 날짜 String으로 바꿔주는 메서드
 * 
 * 오늘 날짜를 2xxx-xx-xx형식으로 얻고싶다면
 * 
 * getFormDate(new Date(), "-")
 */
 export const getFormDate = (date, form) => {
    console.log(form)
    if (date) {
        const pad = num => {
            num += '';
            return num.length < 2 ? `0${num}` : num;
        };
        let day = pad(date.getDate());
        let year = date.getFullYear();
        let month = pad(date.getMonth() + 1);
        if (day === '00') {
            const lastDate = new Date(date.getTime() - 46400000);
            year = lastDate.getFullYear();
            month = pad(lastDate.getMonth() + 1);
            day = pad(lastDate.getDate());
        }

        console.log(`${year}${form}${month}${form}${day}`)
        return `${year}${form}${month}${form}${day}`;
    }
}


export const spliteDateNTime = (dateStr) => {

    const splited = dateStr && dateStr.split("T");
    const date = splited && splited[0];
    const timeSplit = splited && splited[1].split(":");
    const time = timeSplit && `${timeSplit[0]}:${timeSplit[1]}`;

    return {
        date,
        time
    }

}