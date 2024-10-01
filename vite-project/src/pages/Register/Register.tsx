import { Card, Form, Row, Typography } from "antd"
import Layout from "../../components/Layout/Layout"
import CustomInput from "../../components/CustomInput/CustomInput"
import PasswordIput from "../../components/passwordInput/passwordInput"
import { CustomButton } from "../../components/customButton/customButton"
import { Link,  useNavigate } from "react-router-dom"
import { Path } from "../../path"
import '../page.scss';
import { User } from "@prisma/client"
import { useState } from "react"
import { useRegisterMutation } from "../../services/authApi"
import { isErrorMessage } from "../../utils/ErrorMessage"
import ErrorMessage from "../../components/errorMessage/ErrorMessageProps"

type RegisterData = Omit<User, 'id'> & { confirmPassword: string }

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  const handleRegister = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate('/profile', {replace: true})
    } catch (error) {
      const maybeError = isErrorMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else{
        setError("Неизвестная ошибка")
      }
    }
  }


  return (
    <Layout style={{ backgroundColor: "#001529", minHeight: "100vh" }}>
      <Row
        align="middle"
        justify="center"
        style={{ height: "100%", marginTop: '90px' }}
      >
        <Card
          title={
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "#fff", fontSize: "20px", fontWeight: "500" }}>
                Sign Up
              </span>
            </div>
          }
          style={{ width: "30rem", backgroundColor: "#001529", color: "#fff" }}
        >
          <Form onFinish={handleRegister}>
            <CustomInput className='custom0input' name="name" placeholder="Name" />
            <CustomInput className='custom0input' name="email" placeholder="Email" />
            <PasswordIput className='custom0input' name="password" placeholder="Password" />
            <PasswordIput className='custom0input' name="confirmPassword" placeholder="Please confirm password" />

            <CustomButton
              type="primary"
              htmlType="submit"
              className="custom-button"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Register
            </CustomButton>
          </Form>

          <Typography.Text style={{ color: "#fff" }}>
            Already have an account?{" "}
            <Link to={Path.login} style={{ color: "rgb(47, 255, 6)" }}>
              Log in
            </Link>
          </Typography.Text>
          <ErrorMessage message={error}/>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;






