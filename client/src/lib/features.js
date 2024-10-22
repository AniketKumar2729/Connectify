import moment from "moment";

const fileFormat = (url = "") => {
    const fileExt = url.split('.').pop();
    // if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif')
    //     return 'image'
    switch (fileExt) {
        case (fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg'):
            return 'video';
        case (fileExt === 'mp3' || fileExt === 'wav'):
            return 'audio';
        case (fileExt === 'png' || fileExt === 'jpg' || fileExt === "jpeg" || fileExt === 'gif'):
            return 'image';
        default:
            return 'file';
    }

}
const tranformImage=(url="",width=100)=>url
const getLast7Days=()=>{
    const currentDate=moment();
    const last7days=[]
    for (let index = 0; index < 7; index++) {
        const dayDate=currentDate.clone().subtract(index,'days');
        const dayName=dayDate.format('dddd');
        last7days.unshift(dayName)
    }
    return last7days;
};
export { fileFormat,tranformImage,getLast7Days }