
import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, Flex } from 'antd';
import { ClearOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';
import axios from 'axios';


const DataManager = ({ uploadedData, onDataRemove }) => {
    const [loadingExport, setLoadingExport] = useState(false);
    const [loadingImport, setLoadingImport] = useState(false);
    const [loadingClear, setLoadingClear] = useState(false);
    const [isDataExported, setIsDataExported] = useState(localStorage.getItem('ExportedData') || false);

    const handleExport = async () => {
        console.log("uploadedData @ DataManager.js > handleExport:", uploadedData)
        setLoadingExport(true);
        try {
            const dataObj = JSON.parse(uploadedData);
            const filename = dataObj.filesave;
            const formData = new FormData();
            formData.append('filename', filename);
            formData.append('MyVariable', "hello");
            const response = await axios.post('http://localhost:3501/export-data', { filename: filename });
            if (response.status === 200) {
                localStorage.setItem('ExportedData', true);
                setLoadingExport(false);
                Modal.success({
                    title: 'Success',
                    content: 'Data exported successfully!',
                });
                setIsDataExported(true);
                return true;
            } else {
                Modal.error({
                    title: 'Error',
                    content: 'An error occurred while exporting your data. Clear the data and try again',
                
                });
                localStorage.removeItem('ExportedData', true);
                setIsDataExported(false);
                setLoadingExport(false);
                return false;
            }

        } catch (error) {
            console.log("Error: ", error)
            localStorage.removeItem('ExportedData', true);
            setIsDataExported(false);
            setLoadingExport(false);
            return false
        }
    };

    const handleImport = () => {
        // TODO: Implement import function
    };
    
    useEffect(() => {
        console.log("uploadedData @ DataManager.js: ", uploadedData)
        console.log("isDataExported @ DataManager.js: ", isDataExported)
    }, [uploadedData]);

    const removeRequest = async (filename) => {
        setLoadingClear(true);
        try {
            const formData = new FormData();
            formData.append('filename', filename);
            const response = await axios.post('http://localhost:3501/remove-data', { filename: filename });
            if (response.status === 200) {
                setLoadingClear(false);
                setIsDataExported(false);
                localStorage.removeItem('ExportedData');
                return true;
            } else {
                setLoadingClear(false);
                return false;
            }

        } catch (error) {
            console.log("Error: ", error)
            setLoadingClear(false);
            return false
        }
    }

    const handleClear = () => {
        console.log("uploadedData @ DataManager.js > handleClear:", uploadedData)
        Modal.confirm({
            title: 'Clear Data',
            content: 'Are you sure you want to clear the level data?',
            onOk: () => {
                console.log("uploadedData @ handleClear > handleClear > Modal: ", uploadedData)
                const dataObj = JSON.parse(uploadedData);
                console.log("dataObj @ handleClear: ", dataObj)
                const filename = dataObj.filesave;
                console.log("filename @ handleClear: ", filename)
                if (removeRequest(filename)) {
                    onDataRemove(null);
                } else {
                    Modal.error({
                        title: 'Error',
                        content: 'An error occurred while deleting your data, please remove it manually',
                    });
                    return false;
                }

            },
        });
    };

    if(uploadedData!==null){    
        return (
            <Card
                title="Data Management"
                style={{
                    margin: '24px 0',
                    alignSelf: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',

                }}
                bordered={true}
            >
                <p>
                    Now you can import export the Pal data from your Level saved game. <br />
                    Follow the same rules from the command line.<br />
                    Export first, then edit the files according to your needs and then import the files back.<br />
                </p>
                <Flex 
                    vertical 
                    gap="small" 
                    style={{ 
                        margin: '24px 0',
                        width: '80%',
                        alignSelf: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Button 
                        onClick={handleExport} 
                        block 
                        icon={<ExportOutlined />}
                        type="primary"
                        loading={loadingExport}
                    >
                        Export data
                    </Button>
                    <Button 
                        onClick={handleImport} 
                        block 
                        icon={<ImportOutlined />}
                        type={isDataExported?"primary":""}
                        loading={loadingImport}
                        disabled={!isDataExported}
                    >
                        Import data
                    </Button>
                    <Button 
                        onClick={handleClear} 
                        block 
                        icon={<ClearOutlined />}
                        type="primary"
                        loading={loadingClear}
                    >
                        Clear data
                    </Button>
                </Flex>
            </Card>
        );
    }
};

export default DataManager;