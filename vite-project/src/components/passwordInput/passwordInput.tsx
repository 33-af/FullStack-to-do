import {Form, Input} from 'antd';
import { NamePath } from 'antd/es/form/interface';

type passwordIputProps = {
    name: string; //Имя поля, которое будет использоваться формой для отслеживания его значения.
    placeholder: string;
    className: string;
    dependencies?: NamePath[]; // зависит проверка этого поля
}

const PasswordIput = ({
    name,
    placeholder,
    dependencies,
    className
}: passwordIputProps) => {
  return (


    // используется для упаковки входных данных и обработки проверки.
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
            // Проверяет заполненность поля
          required: true,
          message: "Обязательное поле"
        },
        ({ getFieldValue }) => ({
            // проверяет несколько условий на основе name свойства:
          validator(_, value) {
            // Проверка, если поле пустое
            if (!value) {
                // Если поле пустое, то отклоняется с сообщением
              return Promise.reject(new Error('Поле не может быть пустым'));
            }

            // Если поле предназначено для подтверждения пароля
            if (name === 'confirmPassword') {

                // совпадает ли введенное значение с паролем в 
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли должны совпадать'));
            } else {
              // Проверка длины пароля
              if (value.length < 6) {
                return Promise.reject(new Error("Пароль должен быть длинее 6 символов"));
              }
              return Promise.resolve();
            }
          }
        })
      ]}
    >
    
    <Input.Password placeholder={placeholder}  className={className} size='large' />
    </Form.Item>
  );
};

export default PasswordIput
