import './profile.scss'
import { unknownAvatar } from '../../images'
// import CustomInput from '../../components/CustomInput/CustomInput';
import { CustomButton } from '../../components/customButton/customButton';
// import { Form } from 'antd';
import { useCurrentQuery } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
// import { isErrorMessage } from '../../utils/ErrorMessage';
// import { useEffect } from 'react';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// interface userData{
//   name: string;
//   email: string;
// }

const Profile = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  // const [userData, setUserData] = useState<userData | null>(null);
  // const [error, setError] = useState("");
  const { data: userData, error, isLoading } = useCurrentQuery();

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  if (error) {
    return <div className="error-message"></div>;
  }



  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const result = await current().unwrap();
  //       if (!result || Object.keys(result).length === 0) {
  //         setError("Нет данных о пользователе");
  //         return;
  //       }
  //       console.log('User data:', result); // Логируем данные
  //       setUserData(result)
  //     } catch (error) {
  //       console.error('Error:', error); // Логируем ошибку
  //       const maybeError = isErrorMessage(error);
  //       if (maybeError) {
  //         setError(error.data.message);
  //       } else {
  //         setError("Неизвестная ошибка");
  //       }
  //     }
  //   };
  //   fetchUserData();
  // }, [current]);

  if (error) {
    return <h1>{error}</h1>
  }
  if (!userData) {
    return <h1>Loading.....</h1>
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-left">
            <h1 className="profile-title">{userData.name}</h1>
            <span className='profile-date '>{formattedDate}</span>
          </div>
          <div className="profile-right">
            <CustomButton type='link' icon={<LogoutOutlined/>} onClick={ handleLogout} className='logout-btn'>
              LogOut
            </CustomButton>
          </div>

        </div>

        <section className="profile-banner"></section>

        <section className="profile-user__container">
          <div className="user-profile__top">

            <div className="user-profile__left">
              <img src={unknownAvatar} alt="unknownAvatar" className='user-unknown__image' />
              <div className="user-profile-col">
                <p className="user-profile__name">{userData.name}</p>
                <span className="user-profile__email">{userData.email}</span>
              </div>

            </div>

            <div className="user-profile__right">
              <CustomButton type="dashed" className="user-profile__edit-button">Edit</CustomButton>
            </div>
          </div>

          {/* <Form className="user-profile__bottom-form">



            <div className="user-profile__form-left">
              <label htmlFor="name" className="user-profile__label">Full Name
                <CustomInput placeholder='' type="text" name="name" className="user-profile__input" />
              </label>

              <label htmlFor="gender" className="user-profile__label">Gender
                <CustomInput placeholder='' type="text" name="gender" className="user-profile__input" />
              </label>

              <label htmlFor="age" className="user-profile__label">Age
                <CustomInput placeholder='' type="text" name="age" className="user-profile__input" />
              </label>
            </div>

            <div className="user-profile__form-right">
              <label htmlFor="lastName" className="user-profile__label">Last Name
                <CustomInput placeholder='' type="text" name="lastName" className="user-profile__input" />
              </label>

              <label htmlFor="country" className="user-profile__label">Country
                <CustomInput placeholder='' type="text" name="country" className="user-profile__input" />
              </label>

              <label htmlFor="phoneNumber" className="user-profile__label">Phone Number
                <CustomInput placeholder='' type="text" name="phoneNumber" className="user-profile__input" />
              </label>
            </div>
          </Form> */}
        </section>
      </div>
    </div>
  );
};

export default Profile;