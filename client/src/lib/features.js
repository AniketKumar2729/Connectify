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
export { fileFormat,tranformImage }