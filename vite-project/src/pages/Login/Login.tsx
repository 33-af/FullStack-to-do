import { Card, Form, Row, Typography } from "antd";
import Layout from "../../components/Layout/Layout";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordIput from "../../components/passwordInput/passwordInput";
import { CustomButton } from "../../components/customButton/customButton";
import { Path } from "../../path";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, UserData } from "../../services/authApi";
import { useState } from "react";
import { isErrorMessage } from "../../utils/ErrorMessage";
import ErrorMessage from "../../components/errorMessage/ErrorMessageProps";


const Login = () => {

  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [error, setError] = useState("");

  const handleLogin = async (data: UserData) => {
    try {
      const result = await loginUser(data).unwrap();
      navigate('/profile', {replace: true});
      console.log(result)
    } catch (error) {
      const maybeArror = isErrorMessage(error);
      if (maybeArror) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка")
      }
    }
  };


  return (
    <Layout style={{ backgroundColor: "#001529", minHeight: "100vh" }}>
      <Row
        align="middle"
        justify="center"
        style={{ height: "100%", margin: '140px' }}
      >
        <Card
          title={
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "#fff", fontSize: "20px", fontWeight: "500" }}>
                Login
              </span>
            </div>
          }
          style={{ width: "30rem", backgroundColor: "#001529", color: "#fff" }}
        >
          <Form onFinish={handleLogin}>
            <CustomInput className='custom0input' name="email" placeholder="Email" />
            <PasswordIput className='custom0input' name="password" placeholder="Password" />

            <CustomButton
              type="primary"
              htmlType="submit"
              className="custom-button"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Login
            </CustomButton>
          </Form>

          <Typography.Text style={{ color: "#fff" }}>
            You still don't have an account?{" "}
            <Link to={Path.register} style={{ color: "rgb(47, 255, 6)" }}>
              Сreate an account
            </Link>
          </Typography.Text>
          <ErrorMessage message={error} />
        </Card>
      </Row>
    </Layout>
  );
}

export default Login
