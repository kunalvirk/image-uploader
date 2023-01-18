import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '../../firebase'
import DropzoneBox from './DropzoneBox'
import ProgressBar from '../ui/ProgressBar'
import ImagePreview from './ImagePreview'

const Content = {
    init: {
        headeing_icon: false,
        heading: "Upload your image",
        heading_align:"center",
        subheading: "File should be Jpeg, Png,...",
    },
    uploading: {
        headeing_icon: false,
        heading: "Uploading...",
        heading_align:"left",
        subheading: "",
    },
    uploaded: {
        headeing_icon: true,
        heading: "Uploaded Successfully!",
        heading_align:"center",
        subheading: "",
    },
    failed: {
        headeing_icon: true,
        heading: "Uploading Failed!",
        heading_align:"center",
        subheading: "File should be Jpeg, Png,...",
    }
}

function Form() {
    const [status, setStatus] = useState("init");
    const [isUploaded, setUploaded] = useState(null);

    const onDrop = async (files) => {
        setStatus("uploading");
        const suffix = Date.now() + '_' + Math.random(Math.random() * 1E9);
        try {
            const imgRef = ref(storage, `images/${suffix + '_' + files[0].name}`);
            const processUpload = await uploadBytes(imgRef, files[0]);
            const getDownloadedURL = await getDownloadURL(processUpload.ref);

            setStatus("uploaded");
            setUploaded(getDownloadedURL);

        } catch (error) {
            console.log("[ERROR]: ", error);
            setStatus("failed");
        }
    };
    
    const { getRootProps, getInputProps, isDragActive, fileRejections, open } = useDropzone({
        onDrop,
        accept: {"image/png": [], "image/jpeg": [], "image/jpg": []},
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024
    });

    const renderComponents = state => {
        switch(state) {
            case "init":
            case "failed":
                return <DropzoneBox getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} fileRejections={fileRejections} open={open} />
            case "uploading":
                return <ProgressBar />
            default:
                return <div>{isUploaded && <ImagePreview url={isUploaded}/>}</div>;
        }
    }
    
    return (
        <>
            <h1 className={`heading ${status}`}>
                {Content[status].heading}
            </h1>
            {Content[status].subheading && <p className="subheading">{Content[status].subheading}</p>}
            {renderComponents(status)}
        </>
    )
}

export default Form