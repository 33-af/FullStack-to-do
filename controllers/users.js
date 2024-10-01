
// const { prisma } = require('../prisma/prisma-client');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { token } = require('morgan');



// const register = async (req, res) => {
//     try {
//         // Из тела запроса (req.body) извлекаются поля email, password и name
//         const { email, password, name } = req.body;
//         if (!email || !password || !name) {
//             return res.status(400).json({ message: "Пожалуйста заполните обезаельное поле" })
//         }


//         // проверяется, существует ли уже пользователь с таким же email в базе данных.
//         const registeredUser = await prisma.user.findFirst({
//             where: {
//                 email
//             }
//         });

//         if (registeredUser) {
//             return res.status(400).json({ message: "Пользователь с таким email существует" })
//         }


//         // Если пользователь не найден, создается соль  с использованием метода genSalt из библиотеки bcrypt. Соль добавляет случайные данные к паролю,
//         // что усложняет задачу злоумышленникам при попытке его взлома
//         const salt = await bcrypt.genSalt(10);
//         //Пароль хешируется с использованием этой соли с помощью метода hash, что обеспечивает безопасное хранение пароля в базе данных.
//         const hashPassword = await bcrypt.hash(password, salt)



//         // Новый пользователь создается в базе данных с помощью метода create
//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 name,
//                 password: hashPassword //хешированный пароль
//             }
//         });

//         const secret = process.env.JWT_SECRET;
//         // Если пользователь успешно создан и секретный ключ для генерации JWT доступен,
//         if (user && secret) {
//             res.status(201).json({
//                 id: user.id,
//                 email: user.email,
//                 name,
//                 // создание jwt с индефикатором пользователя сроком 30 дней и возвр обратно клиенту в ответе
//                 token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
//             })
//         } else {
//             return res.status(400).json({ message: "Не удалось создать пользователя" })
//         }
//     } catch (error) {
//         return res.status(400).json({ message: 'Что то пошло не так' })
//     }
// }

// const login = async (req, res) => {
//     try {

//         //принимаем при отправке формы
//         const { email, password } = req.body;

//         //Проверка на валидность
//         if (!email || !password) {
//             return res.status(400).json({ message: "Please fill in the blank" });
//         }


//         // Поиск пользователя по email в базе данных
//         const user = await prisma.user.findFirst({
//             where: {
//                 email
//             }
//         });

//         //секретная строка
//         const secret = process.env.JWT_SECRET;


//         // Проверка совпадения паролей: введенного и сохраненного
//         const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))


//         // Если пользователь найден и пароль совпадает, возвращаем токен и данные пользователя
//         if (user && isPasswordCorrect) {
//             return res.status(200).json({
//                 id: user.id,
//                 email: user.email,
//                 name: user.name,
//                 token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
//             })
//         } else {
//             return res.status(400).json({ message: "Incorrect login or password entered" })
//         }

//     } catch (error) {
//         return res.status(400).json({ message: "Something went wrong" })
//     }
// }

// //ты отдаёшь текущего пользователя 
// const current = async (req, res) => {
//     return res.status(200).json(req.user)
// }


// module.exports={
//     register,
//     login,
//     current
// }


const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязятельные поля' })
    }
  
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    const secret = process.env.JWT_SECRET;
    const isPasswordCorrect = user && (await brypt.compare(password, user.password));

  
    if (user && isPasswordCorrect) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Неверно введен логин или пароль' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}


const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if(!email || !password || !name) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
    }
  
    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    });
  
    if (registeredUser) {
      return res.status(400).json({ message: 'Пользователь, с таким email уже существует' })
    }
  
    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);
  
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassord
      }
    });
  
    const secret = process.env.JWT_SECRET;
  
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

const current = async (req, res) => {
  return res.status(200).json(req.user)
}

module.exports = {
  login,
  register,
  current
}