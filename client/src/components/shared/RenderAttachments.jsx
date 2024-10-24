import React from 'react'
import { tranformImage } from '../../lib/features';
import FileOpenIcon from '@mui/icons-material/FileOpen';
const RenderAttachments = (file, url) => {
    switch (file) {
        case 'video':
            return <video src={url} preload='none' width={'200px'} controls />
            
        case 'image':
            return <img src={tranformImage(url,200)} alt='Attachment image' width={'200px'} height={'150px'} style={{objectFit:'contain'}} />
            
        case 'audio':
            return <audio src={url} preload='none' controls/>
        
        default:
            return <FileOpenIcon/>
    }
}

export default RenderAttachments;