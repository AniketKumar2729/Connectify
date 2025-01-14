import moment from "moment";

const fileFormat = (url = "") => {
    const fileExt = url.split('.').pop();
    // if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif')
    //     return 'image'
    if (fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg') {
        return 'video';
    } else if (fileExt === 'mp3' || fileExt === 'wav') {
        return 'audio';
    } else if (fileExt === 'png' || fileExt === 'jpg' || fileExt === "jpeg" || fileExt === 'gif') {
        return 'image';
    }
    else
        return 'file';
}
const tranformImage = (url = "", width = 100) =>{
    const newUrl=url.replace("upload/",`upload/,dpr_auto/w_${width}/`)
    return newUrl
}
const getLast7Days = () => {
    const currentDate = moment();
    const last7days = []
    for (let index = 0; index < 7; index++) {
        const dayDate = currentDate.clone().subtract(index, 'days');
        const dayName = dayDate.format('dddd');
        last7days.unshift(dayName)
    }
    return last7days;
};
export { fileFormat, tranformImage, getLast7Days}