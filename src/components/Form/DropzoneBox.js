import React from 'react'

function DropzoneBox({getRootProps, getInputProps, isDragActive, fileRejections, open}) {
  return (
    <div className="dropzone-wrapper">
                <div className='dropzone' {...getRootProps()}>
                    <div className="droparea">
                        <img src={process.env.PUBLIC_URL + "image.svg"} alt="Upload images here..." />
                        <input {...getInputProps()} />
                        {
                            isDragActive ? <p className='text-dim'>Drop the files here...</p> : <p className='text-dim'>Drag & Drop your image here</p>
                        }
                    </div>

                    <div className="show-rejected">
                        {fileRejections.map(({file, errors}) => (
                            <li key={file.path}>
                                {file.name}
                                <ul>
                                    {errors.map(e => (
                                    <li key={e.code}>{e.message}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </div>
                </div>

                <div className="footer-area">
                    <p className='text-dim'>Or</p>
                    <button onClick={open}>Choose file(s)</button>
                </div>
            </div>
  )
}

export default DropzoneBox