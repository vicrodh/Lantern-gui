import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import Icon, {
    HomeOutlined,
    UploadOutlined,
    EditOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const PalSvg = () => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path d="M0 0 C2.5 1.5 2.5 1.5 4 4 C4.791013 8.02098277 4.62153384 10.96411027 2.5 14.5 C-1.03588973 16.62153384 -3.97901723 16.791013 -8 16 C-10.5 14.5 -10.5 14.5 -12 12 C-12.791013 7.97901723 -12.62153384 5.03588973 -10.5 1.5 C-6.96411027 -0.62153384 -4.02098277 -0.791013 0 0 Z " fill="#7AB7D7" transform="translate(12,0)"/>
        <path d="M0 0 C2.5 1.5 2.5 1.5 4 4 C4.63497195 7.62736851 4.78604089 10.85666779 2.625 14 C1 15 1 15 -1 15 C-1.33 14.01 -1.66 13.02 -2 12 C-1.01 11.67 -0.02 11.34 1 11 C1 8.69 1 6.38 1 4 C-1.28705831 2.85647084 -2.59264762 2.89665561 -5.125 2.9375 C-6.40375 2.958125 -7.6825 2.97875 -9 3 C-9.08004482 6.5219721 -9.04005702 9.61981469 -8 13 C-8.99 13 -9.98 13 -11 13 C-12 12 -12 12 -12.3125 8.1875 C-12.25377389 5.21382315 -12.07349312 4.12248853 -10.5 1.5 C-6.96411027 -0.62153384 -4.02098277 -0.791013 0 0 Z " fill="#8353E1" transform="translate(12,0)"/>
        <path d="M0 0 C3.125 0.1875 3.125 0.1875 6.125 2.1875 C6.125 3.5075 6.125 4.8275 6.125 6.1875 C3.815 6.1875 1.505 6.1875 -0.875 6.1875 C-0.875 5.5275 -0.875 4.8675 -0.875 4.1875 C-1.535 4.1875 -2.195 4.1875 -2.875 4.1875 C-3.205 4.8475 -3.535 5.5075 -3.875 6.1875 C-3.917721 4.52138095 -3.91563832 2.85367115 -3.875 1.1875 C-2.875 0.1875 -2.875 0.1875 0 0 Z " fill="#7BDCF1" transform="translate(7.875,1.8125)"/>
        <path d="M0 0 C1.4540625 0.0309375 1.4540625 0.0309375 2.9375 0.0625 C2.9375 0.7225 2.9375 1.3825 2.9375 2.0625 C2.2775 2.7225 1.6175 3.3825 0.9375 4.0625 C1.2675 5.0525 1.5975 6.0425 1.9375 7.0625 C0.2875 7.0625 -1.3625 7.0625 -3.0625 7.0625 C-3.44383299 5.0710944 -3.77575582 3.06970923 -4.0625 1.0625 C-3.0625 0.0625 -3.0625 0.0625 0 0 Z " fill="#EFDDC2" transform="translate(10.0625,8.9375)"/>
        <path d="M0 0 C2 3 2 3 1.875 5.5625 C1 8 1 8 -1.0625 9.3125 C-1.701875 9.539375 -2.34125 9.76625 -3 10 C-3.33 9.01 -3.66 8.02 -4 7 C-3.01 6.67 -2.02 6.34 -1 6 C-0.67 4.02 -0.34 2.04 0 0 Z " fill="#8359E2" transform="translate(14,5)"/>
        <path d="M0 0 C1.4540625 0.0309375 1.4540625 0.0309375 2.9375 0.0625 C2.9375 1.0525 2.9375 2.0425 2.9375 3.0625 C1.968125 3.18625 0.99875 3.31 0 3.4375 C-1.010625 3.64375 -2.02125 3.85 -3.0625 4.0625 C-3.3925 4.7225 -3.7225 5.3825 -4.0625 6.0625 C-4.105221 4.39638095 -4.10313832 2.72867115 -4.0625 1.0625 C-3.0625 0.0625 -3.0625 0.0625 0 0 Z " fill="#94E0F4" transform="translate(8.0625,1.9375)"/>
        <path d="M0 0 C0.28875 0.61875 0.5775 1.2375 0.875 1.875 C1.93720042 4.13325765 1.93720042 4.13325765 4 6 C3.625 8.125 3.625 8.125 3 10 C2.01 9.34 1.02 8.68 0 8 C-0.40843923 5.28796348 -0.13336867 2.7562858 0 0 Z " fill="#6B4FC2" transform="translate(0,4)"/>
        <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C3 2.98 3 4.96 3 7 C1.68 6.67 0.36 6.34 -1 6 C-0.67 4.02 -0.34 2.04 0 0 Z " fill="#79D2EE" transform="translate(4,9)"/>
    </svg>
);
const PalIcon = (props) => <Icon component={PalSvg} {...props} />;

const { Sider } = Layout;

function getItem(label, key, icon, path, children) {
    return {
        key,
        icon,
        label,
        path, // Add the path property to the item
        children, // Set the items property to undefined if the path is defined
    };
}

function getSubMenu(label, key, icon, children) {
    return {
        key,
        icon,
        label,
        children,
    };
}
const items = [
    getItem('Home', '1', <HomeOutlined />, '/'), // Set the path to '/'
    getItem('Manage Data', '2', <UploadOutlined />, '/data-manager'), // Set the path to '/data-manager'
    getSubMenu('Edit your files', 'sub1', <EditOutlined />, [
        getItem('Players', '4', <UserOutlined />, '/players'), // Set the path to '/option1'
        getItem('Pals', '5', <PalIcon />, '/pals'), // Set the path to '/option2'
    ]), // Set the path to '/data-manager'
];

const Sidemenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isDataExported, setIsDataExported] = useState(localStorage.getItem('ExportedData') || false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleMenuClick = (key) => {
        const findItemByKey = (key, items) => {
            for (const item of items) {
                if (item.key === key.key) {
                    return item;
                }
                if (item.children) {
                    const foundItem = findItemByKey(key, item.children);
                    if (foundItem) {
                        return foundItem;
                    }
                }
            }
            return null;
        };

        const selectedItem = findItemByKey(key, items);
        navigate(selectedItem.path)
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[]}
                mode="inline"
                theme="dark"
                onClick={(key) => handleMenuClick(key)}
                items={items}
            />
        </Sider>
    );
};

export default Sidemenu;
