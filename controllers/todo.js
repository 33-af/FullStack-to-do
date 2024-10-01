const { prisma } = require("../prisma/prisma-client")


//получение всех заданий
const all = async (req, res) => {
    try {

        // Получение всех задач пользователя
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.user.id
            }
        });

         res.status(200).json(todos)
    } catch (error) {
         res.status(500).json({ message: "Failed to fetch tasks" });
    }
}


//добавить задание
const add = async (req, res) => {
    try {
        // Извлекаем данные, отправленные в теле запроса
        const data = req.body;

        if (!data.title || !data.description) {
            return res.status(400).json({ message: "All fields are required" })
        }



        // Создаём новую задачу  добавляя к данным userId текущего пользователя
        const todo = await prisma.todo.create({
            data: {
                //Добавлеям  userId к data
                ...data,
                createdAt: new Date().toISOString(),
                userId: req.user.id // Привязываем задачу к конкретному пользователю
            }
        });

        return res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const remove = async (req, res) => {
    // Извлекаем id задачи из параметров запроса
    const { id } = req.params;
    try {
        // Находим задачу по id и userId текущего пользователя
        const todo = await prisma.todo.findFirst({
            where: {
                id, // Ищем задачу по её id
                userId: req.user.id // Проверяем, принадлежит ли задача текущему пользователю
            }
        });

        if (!todo) {
            return res.status(404).json({ message: "Task not found or does not belong to you." })
        }



        // Удаляем задачу
        await prisma.todo.delete({
            where: {
                id // Удаляем задачу по id
            }
        })
        // Возвращаем успешный ответ
        res.status(200).json('OK')
    } catch (error) {
        res.status(500).json({ message: "Failed to delete the task" });
    }
}


const edit = async (req, res) => {
    // извлекаем  id из запросов
    const { id } = req.params;
    
    // Получаем новые данные для обновления задачи из тела запроса
    const data = req.body;

    try {
        //    ищем задачу текущего пользователя
        const editTodo = await prisma.todo.findFirst({
            where: {
                //ищем заадачу по её id
                id,
                // проверяем принадлежит ли задача текущему пользователю
                userId: req.user.id
            }
        });

        if (!editTodo) {
            return res.status(404).json({ message: "Task not found or does not belong to you" });
        }



        //обновляем задачу
        await prisma.todo.update({
            where: {
                id, // для обновления по id
              },
              data: {
                ...data, // передаем обновленные данные из тела запроса
              },
        });

              // Возвращаем успешный ответ
        res.status(200).json('OK')

    } catch (error) {
        res.status(500).json("Failed to edit the task")
    }
}


const currenttodo = async (req, res) => {
    // Извлекаем данные с параметрова запроса
    const [id] = req.params

    try {
        // Ищем задачу по id и userId текущего пользователя
        const todo = await prisma.todo.findFirst({
            where: {
                id,  // Ищем задачу по её id
                userId: req.user.id //принадлежит ли задача текущему пользователю
            }
        });
        if (!todo) {
            return res.status(404).json({ message: "Task  not found or does not belong to you" });
        }

                // Если задача найдена, возвращаем её в ответе
         res.status(200).json(todo);

    } catch (error) {
         res.status(500).json({ message: "Failed to get a task" })
    }
}

module.exports={
    all,
    add,
    edit,
    remove,
    currenttodo
}