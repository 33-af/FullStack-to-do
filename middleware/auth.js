// const jwt = require('jsonwebtoken');
// const { prisma } = require('../prisma/prisma-client');




// const auth = async (req, res, next) => {
//     try {

//         //jwt токен который получили когда пользователь зарегестрировался  и разбили его и получили сам Bearer токен
//         //Когда клиент делает запрос на защищённый маршрут, он должен отправить этот токен в заголовках,
//         let token = req.headers.authorization?.split(' ')[1]; 

//         if (!token) {
//             res.status(401).json({ message: "Not authorized" })
//         }

//         //Проверяет не подделаный ли токен с секретным кодом
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);


//         // Находим пользователя в базе данных по ID из декодированного токена
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: decoded.id
//             }
//         });

//         // Если пользователь не найден, возвращаем ошибку
//         if (!user) {
//             return res.status(401).json({ message: "User not found" });
//         }


//         // Добавляем пользователя в объект запроса для последующего использования
//         req.user = user;

//         next();

//     }catch (error) {
//         res.status(401).json({ message: "Not authorized" })
//     }
// }
// module.exports = {
//     auth
// }


const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};

module.exports = {
  auth,
};