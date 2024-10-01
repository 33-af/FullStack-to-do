

import { Todo } from '@prisma/client';
import { useEditTodoMutation, useGetAllTodosQuery, useRemoveTodoMutation } from '../../features/todos/todos';
import './Todos.scss'
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal, Row } from 'antd';
import { useRef, useState } from 'react';


import AddTodoForm from '../../components/AddTodoForm/AddTodoForm';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../path';





const Todos = () => {
  const { data: todos, isLoading } = useGetAllTodosQuery();
  const [updateStatus] = useEditTodoMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [error, setError] = useState("");

  const [editTodo] = useEditTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate()


  const handleEditTodo = async (todo: Todo) => {
    try {
      const editedTodo = {
        ...selectedTodo,
        ...todo,
      };

      await editTodo(editedTodo).unwrap();

      setIsModalOpen(false); 
      navigate(Path.SuccesUpdatedTodo, { replace: true });
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      await removeTodo(todo.id).unwrap();
      navigate(Path.SuccesDeletedTodo, {replace: true})
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };


  const handleStatusChange = async (todo: Todo, newStatus: string) => {
    try {
      await updateStatus({ ...todo, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo); // Set the current todo to be edited
    setIsModalOpen(true);
  };

  // Close modal
  const hideModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null); // Reset selected todo
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id)); 

  };

  const handleOptionSelect = (todo: Todo, status: string) => {
    handleStatusChange(todo, status);
    setOpenDropdownId(null); 
    navigate(Path.SuccesUpdatedTodo, { replace: true });
  };
  return (
    <section className="todos">
      <div className="todos-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : todos?.length ? (
          todos.map((todo) => (
            <div className="todo-card" key={todo.id}>
              <div className="todo-info">
                <div className="todo-header">
                  <h3 className="todo-cart__title">{todo.title}</h3>
                  <div className="title-fc">
                    <button className="edit-btn" onClick={() => openModal(todo)}>
                      <EditOutlined className="edit-link" />
                    </button>
                    <button className="edit-btn" onClick={() => handleDeleteTodo(todo)}>
                      <CloseOutlined className="title-remove" />
                    </button>
                  </div>


                </div>
                <div className="todo-desc">
                  <p className="todo-cart__desc">{todo.description}</p>
                </div>
                <div className="todo-card__bottom">
                  <p className="todo-card__date">
                    Created at: {new Date(todo.createdAt).toLocaleDateString("ru-RU")}
                  </p>


                  <div className="dropdown-container" ref={dropdownRef}>
                    
                    <button
                      className={`dropdown-btn ${todo.status === "Pending"
                          ? "pending-btn"
                          : todo.status === "In Progress"
                            ? "in-progress-btn"
                            : "completed-btn"
                        }`}
                        onClick={() => toggleDropdown(todo.id)} 
                    >
                      {todo.status}
                    </button>
                    {openDropdownId === todo.id && (
                      <ul className={`dropdown-list ${dropdownOpen ? 'show' : ''}`}>
                        {["Pending", "In Progress", "Completed"].map((status) => (
                          <li
                            key={status}
                            className={`dropdown-item ${status === "Pending"
                                ? "pending"
                                : status === "In Progress"
                                  ? "in-progress"
                                  : "completed"
                              }`}
                              onClick={() => handleOptionSelect(todo, status)}
                          >
                            {status}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>

      {
        isModalOpen && (
          <Modal open={isModalOpen}  onCancel={hideModal}  footer={null}>
            
            <Row align="middle" justify="center">
              <AddTodoForm
                title="Edit Todo"
                btnText="Edit"
                error={error}
                todo={selectedTodo}
                onFinish={handleEditTodo}
              />
           
            </Row>
          </Modal>
        )
      }
    </section >
  );
};

export default Todos
