import React, { useEffect, useState } from 'react';
import { BellOutlined, CheckCircleOutlined, CloseOutlined, DeleteOutlined, FileDoneOutlined, LaptopOutlined, NotificationOutlined, PlusOutlined, SearchOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Button, Menu, Modal, Row } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { Path } from '../../path';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useAddTodoMutation } from '../../features/todos/todos';
import { Todo } from '@prisma/client';
import { isErrorMessage } from '../../utils/ErrorMessage';
import '../components.scss'



type AppLayoutProps = {
    children: React.ReactNode;
    btnTxt: string
};

const { Header, Content, Sider } = AntLayout;

const Layout = ({ children }: AppLayoutProps) => {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const user = useSelector(selectUser);
    const [addTodo] = useAddTodoMutation();
    const navigate = useNavigate();


    useEffect(() => {
        if (!user && !['/login', '/register'].includes(window.location.pathname)) {
            navigate('/login');
        }
    }, [navigate, user]);

    const handleAddTodo = async (data: Todo) => {
        try {
            await addTodo(data).unwrap();
            navigate(Path.SuccesAddTodo, { replace: true });
            setOpen(false)
         } catch (error) {
            const maybeArror = isErrorMessage(error);
            if (maybeArror) {
                setError(error.data.message)
            } else {
                setError("Неизвестная ошибка")
            }
        }
    }


    const showModal = () => {
        setOpen(true);
    }

    const hideModal = () => {
        setOpen(false)
    };


    const items1 = [
        {
            key: 'Search',
            label: (
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    iconPosition={position}
                    className="search-button"
                >
                    Search
                </Button>
            ),
        },
        { key: 'Add Todos', label: <Button type='button' onClick={showModal} className="search-button" icon={<PlusOutlined />}>Add Todo</Button> },
        { key: 'Profile', label: <Link to={Path.profile}>Profile</Link> },
        // { key: 'Register', label: <Link to={Path.register}>Register</Link> },
        // { key: 'Login', label: <Link to={Path.login}>Login</Link> },
        { key: 'Todo', label: <Link to={Path.todos}>Todos</Link> },
    ];

    const items2 = [
        {
            key: 'sub1',
            icon: React.createElement(UserOutlined),
            label: 'User',
            children: [
                {
                    key: 'searchByTags',
                    label: 'Search by tags',
                },
                {
                    key: 'today',
                    label: 'Today',
                },
                // You can add more items here if needed
            ],
        },
        {
            key: 'sub2',
            icon: React.createElement(LaptopOutlined),
            label: 'Laptop',
            children: [
                {
                    key: 'option1',
                    label: 'option1',
                },
                {
                    key: 'option2',
                    label: 'option2',
                },
            ],
        },
        {
            key: 'sub3',
            icon: React.createElement(NotificationOutlined),
            label: 'Notification',
            children: [
                {
                    key: 'subscribe',
                    icon: <BellOutlined />,
                    label: 'Subscribe',
                },
                {
                    key: 'unsubscribe',
                    icon: <CloseOutlined />,
                    label: 'Unsubscribe',
                },
            ],
        },


        {
            key: 'sub4',
            icon: React.createElement(FileDoneOutlined),
            label: 'Tasks',
            children: [
                {
                    key: 'delete',
                    icon: <DeleteOutlined />,
                    label: 'Delete',
                },
                {
                    key: 'inProgress',
                    icon: <SyncOutlined />,
                    label: 'In Progress',
                },
                {
                    key: 'completed',
                    icon: <CheckCircleOutlined />,
                    label: 'Completed',
                },
            ],
        },
    ];

    return (
        <AntLayout style={{ minHeight: '100vh', margin: '0' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className='demoLogo'>CreativeNest</h1>
                <Menu
                    className='menu'
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKeys}
                    onClick={() => setSelectedKeys([])}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>

            <AntLayout style={{ height: '100%' }}>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                    />
                </Sider>
                <AntLayout style={{ padding: '0 24px 24px', height: '100%' }}>
                    <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        {children}
                    </Content>
                </AntLayout>
            </AntLayout>
            <Modal
                open={open}
                onCancel={hideModal}
                footer={null}

            >
                <Row align="middle" justify="center">
                    <AddTodoForm
                        title="Add Todo"
                        error={error}
                        btnText='Create Todo'
                        onFinish={handleAddTodo}
                    />
                </Row>
            </Modal>

        </AntLayout >
    );

};

export default Layout;