import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidemenu from '../components/Sidemenu';

const { Header, Content } = Layout;

const Home = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: theme.useToken().token.colorBgContainer,
                        }}
                    >
                        {/* Add your content here */}
                        This is the home page. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc id aliquam lacinia, nisl nunc tincidunt nunc, nec lacinia nunc nisl id nunc. Nulla facilisi. Sed nec nunc auctor, aliquet nunc id, ultrices nunc. 
                        Phasellus auctor, nunc id aliquam lacinia, nisl nunc tincidunt nunc, nec lacinia nunc nisl id nunc. Nulla facilisi. Sed nec nunc auctor, aliquet nunc id, ultrices nunc. 
                        Phasellus auctor, nunc id aliquam lacinia, nisl nunc tincidunt nunc, nec lacinia nunc nisl id nunc. Nulla facilisi. Sed nec nunc auctor, aliquet nunc id, ultrices nunc. 
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
export default Home;