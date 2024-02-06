import React, { useState, useEffect } from 'react';
import { Layout, theme, Flex, Card, Select, Button, Form, Input, InputNumber, Space } from 'antd';
import Sidemenu from '../components/Sidemenu';

const { Header, Content } = Layout;




const Players = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [players, setPlayers] = useState(localStorage.getItem('PlayersExportedData') || null);
    const [pals, setPals] = useState(localStorage.getItem('PalsExportedData') || null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [value, setValue] = useState(null);
    // console.log("Players: ", players)
    const options = JSON.parse(players);
    
    const player_options = options.map((player) => ({
        value: player.player_id,
        label: player.name,
    }));

    
    const selectHandler = (value) => {
        console.log("Selected: ", value)
        setValue(value);
    }
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) => 
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    
    
    const filterSort = (optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase()
    );

    const loadHandler = (value) => {
        console.log("Load: ", value)
        const player = options.find((player) => player.player_id === value.value);
        setSelectedPlayer(player);
        console.log("Player: ", selectedPlayer)
    }

    const getPlayerPals = (player) => {

    }

    const getPropertyName = (item) => {
        for(var key in item) {
            if(item.hasOwnProperty(key)) {
                var property = item[key];
                //do whatever you want with the property here, for example console.log(property)
                return property;
            }
        }
    }

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
                    <Card title="Search" style={{ width: '99%', marginTop: 24 }}>
                        <Select
                            showSearch
                            // fieldNames={ label: 'name', value: 'id' }
                            style={{ width: 400 }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            filterSort={filterSort}
                            options={player_options}
                            onSelect={selectHandler}
                            value={value}
                            labelInValue={true}
                        />
                        <Button
                            type="primary"
                            style={{ marginLeft: 16 }}
                            onClick={() => loadHandler(value)}
                            disabled={value === null}
                        >
                            Load
                        </Button>
                    </Card>
                    { selectedPlayer && 
                    <Card title="Player" style={{ width: '99%', marginTop: 24 }}>
                        <Form layout="inline">
                        
                            
                            <Form.Item 
                                label="PalType" 
                                name="PalType" 
                                className='playerForm'
                                size="small" 
                            >
                                <Input 
                                    defaultValue={selectedPlayer.content?.PalType} 
                                    size="small" 
                                />
                            </Form.Item>
                
                            <Form.Item 
                                label="PlayerID" 
                                name="PlayerID" 
                                className='playerForm'
                            >
                                <Input 
                                    defaultValue={selectedPlayer.content?.PlayerID} 
                                    size="small" 
                                />
                            </Form.Item>
                
                            <Form.Item 
                                label="InstanceID" 
                                name="InstanceID" className='playerForm'
                            >
                                <Input 
                                    defaultValue={selectedPlayer.content?.InstanceID} 
                                    size="small" 
                                />
                            </Form.Item>
                
                            <Form.Item 
                                label="GroupID" 
                                name="GroupID" 
                                className='playerForm'
                            >
                                <Input 
                                    defaultValue={selectedPlayer.content?.GroupID} 
                                    size="small"     
                                />
                            </Form.Item>
                
                            <Form.Item 
                                label="Name" 
                                name="Name" 
                                className='playerForm'
                            >
                                <Input 
                                    defaultValue={selectedPlayer.content?.Name}
                                    size="small" 
                                />
                            </Form.Item>
                
                            <Form.Item label="Level" name="Level" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="EXP" name="EXP" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="MaxHP" name="MaxHP" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="HP" name="HP" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="MaxShield" name="MaxShield" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="Shield" name="Shield" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                            
                
                            
                            <Form.Item label="MaxStamina" name="MaxStamina" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="Sanity???" name="Sanity???" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="Stomach" name="Stomach" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="Support" name="Support" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="CraftSpeed" name="CraftSpeed" className='playerForm'>
                                <InputNumber />
                            </Form.Item>
                
                            <Form.Item label="UsedStatusPoints" name="UsedStatusPoints">
                                {selectedPlayer?.content.UsedStatusPoints.map((item, index) => (
                                <Space key={index} style={{ maxWidth: '45%', border:'1px solid red'}}>
                                    <Form.Item label={getPropertyName(item)} name={['item', index, 'Value']}>
                                    <Input defaultValue={getPropertyName(item)} />
                                    </Form.Item>
                                    <Form.Item label={`Count`} name={['item', index, 'Count']}>
                                    <InputNumber />
                                    </Form.Item>
                                </Space>
                                ))}
                            </Form.Item>
                
                            <Form.Item label="VoiceID" name="VoiceID">
                                <InputNumber />
                            </Form.Item>
                            
                        
                        </Form>
                    </Card>
                    }
                </Content>
            </Layout>
        </Layout>
    )
}
export default Players;