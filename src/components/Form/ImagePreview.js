import React, { useRef, useState } from 'react'
import { toast } from 'react-toast'
import { copyTextToClipboard } from '../helpers/copy';

function ImagePreview({url}) {
    const [isCopied, setIsCopied] = useState(false);
    const textRef = useRef(null);

    const handleClick = (text) => {
        copyTextToClipboard(text).then(() => {
            toast.info("Copied to clipboard");
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false)
            }, 1500);
        })
        .catch(err => {
            console.log("Error while trying to copy", err);
        })
    }

    return (
        <>
            <div className="img-preview-wrapper">
                <img src={url} alt="preview" />
            </div>
            <div className="img-copy">
                <div className="img-url-box" ref={textRef}>{url}</div>
                <div className="img-copy-btn">
                    <button onClick={() => handleClick(textRef.current.textContent)}>Copy Link</button>
                </div>
            </div>
        </>
    )
}

export default ImagePreview