import React, { useState } from 'react';
import {
    UploadOutlined, DesktopOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, items) {
    return {
        key,
        icon,
        items,
        label,
    };
}

const items = [
    getItem('Load data', '1', <UploadOutlined />, []),
    getItem('Option 2', '2', <DesktopOutlined />, []),
];

const Page = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            {/* Begin of the Sider component */}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            {/* End of the Sider component */}
            <Layout>
                {/* Begin of the Header component */}
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                {/* End of the Header component */}
                {/* Begin of the Content component */}
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Bill is a cat.
                    </div>
                </Content>
                {/* End of the Content component */}
                {/* Begin of the Footer component */}
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
                {/* End of the Footer component */}
            </Layout>
        </Layout>
    );
};

export default Page;