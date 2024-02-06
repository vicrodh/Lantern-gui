import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import axios from 'axios';

const { Dragger } = Upload;

const FileUploader = ({ onDataUpload }) => {

    const [fileList, setFileList] = useState([]);


    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    
    const onRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    const customRequest = async({ file, onSuccess, onError }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('http://localhost:3501/upload', formData);

            if (response.status === 200 && response.data.filesave) {
                localStorage.setItem('levelData', JSON.stringify(response.data));
                message.success('File uploaded successfully!');
                onDataUpload(JSON.stringify((response.data)));
                onSuccess();
                setTimeout(() => {
                    setFileList([]);
                }, 2000);

            } else {
                message.error('Failed to upload file.');
                onError();
            }
        } catch (error) {
            message.error('Failed to upload file.');
            onError();
        }



    };
    const props = {
        customRequest,
        onChange,
        onRemove,
        fileList,
        listType: "text",
        accept: ".json",
    };
    return (
        <Dragger
            style={{
                marginTop: '24px',
                maxHeight: '200px',
                maxWidth: '400px',
                alignSelf: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
            {...props}
        >
            <p className="ant-upload-drag-icon">
                {/* Add your drag and drop icon here */}
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Only support Level.sav.json file</p>
        </Dragger>
    );
};

export default FileUploader;