import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
    HomeOutlined,
    UploadOutlined,
    EditOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const { Sider } = Layout;

function getItem(label, key, icon, path) {
    return {
        key,
        icon,
        label,
        path, // Add the path property to the item
    };
}

const items = [
    getItem('Home', '1', <HomeOutlined />, '/'), // Set the path to '/'
    getItem('Manage Data', '2', <UploadOutlined />, '/data-manager'), // Set the path to '/data-manager'
    getItem('Edit your files', '3', <EditOutlined />, '/data-manager'), // Set the path to '/data-manager'
];

const Sidemenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleMenuClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}>
                {items.map((item) => (
                    <Menu.Item
                        key={item.key}
                        icon={item.icon}
                        onClick={() => handleMenuClick(item.path)} // Call handleMenuClick with the path
                    >
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default Sidemenu;
