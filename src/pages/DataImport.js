import React, { useState, useEffect } from 'react';
import { Layout, theme } from 'antd';
import Sidemenu from '../components/Sidemenu';
import FileUploader from '../components/LevelLoader';
import DataManager from '../components/DataManager';

const { Header, Content } = Layout;

const DataImport = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [uploadedData, setUploadedData] = useState(localStorage.getItem('levelData')||null);

    
    const isValidJson = (jsonString) => {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleDataUpload = (data) => {
        console.log("Data: ", data)
        if (!isValidJson(data) || data === null) {
            console.log("Invalid data")
            setUploadedData(null);
            localStorage.removeItem('ExportedData', true);
            localStorage.removeItem('levelData');
            console.log(isValidJson(data))
            return;
        }else{
            setUploadedData(data);
        }
        
    };

    useEffect(() => {
        console.log("Uploaded data: ", uploadedData)
    }, [uploadedData, handleDataUpload]);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sidemenu />
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: theme.useToken().token.colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    
                    <DataManager uploadedData={uploadedData} onDataRemove={handleDataUpload} />
                    <FileUploader onDataUpload={handleDataUpload} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DataImport;