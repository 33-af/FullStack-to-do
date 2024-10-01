import { Todo } from "@prisma/client"
import { Card, Form, Input } from "antd";

import CustomInput from "../CustomInput/CustomInput";
import ErrorMessage from "../errorMessage/ErrorMessageProps";
import { CustomButton } from "../customButton/customButton";

type AddTodoFormProps<T> = {
    title: string;
    error?: string;
    onFinish: (initialValues: T) => void;
    todo?: T;
    btnText: string;
    
}

const AddTodoForm = ({
    title,
    onFinish,
    todo,
    error,
    btnText
}: AddTodoFormProps<Todo>) => {
    return (

        <Card title={title} style={{ width: "30rem" }}>
            <Form
                name="addTodo"
                initialValues={todo}
                onFinish={onFinish}
            >
                <Form.Item name="title">
                    <CustomInput className="" placeholder="Title" name="title" type='text' />
                </Form.Item>

                <Form.Item name="description">
                    <Input.TextArea name='description' className="" placeholder="Description" />
                </Form.Item>

                <ErrorMessage message={error} />

                <Form.Item>
                    <CustomButton htmlType="submit">
                        {btnText}
                    </CustomButton>
                </Form.Item>
            </Form>
        </Card>
        
    );
}

export default AddTodoForm;