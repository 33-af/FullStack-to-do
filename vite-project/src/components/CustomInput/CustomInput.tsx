import { Input, Form } from "antd";
import { useState } from "react";


type CustomInputProps = {
    name: string;
    placeholder: string;
    type?: string;
    className?: string; // Optional className
}

const CustomInput = ({ name, placeholder, type = 'text', className }: CustomInputProps) => {
    // Local state to manage the input value and error
    const [error, setError] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (newValue.length > 20) {
            setError('Максимум 20 элементов');
        } else {
            setError('');
        }
    };

    return (
        <Form.Item
            name={name}
            rules={[{ required: true, message: "Обязательное поле" }]}
            validateStatus={error ? 'error' : ''} // Set validation status based on error
            help={error} // Show error message as help text
        >
            <Input
                placeholder={placeholder}
                type={type}
                size='large'
                className={className}
                onChange={handleChange}
                maxLength={20} // HTML-level limit
            />
        </Form.Item>
    );
};

export default CustomInput;