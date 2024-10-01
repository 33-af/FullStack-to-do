import { Link } from "react-router-dom"
import { Path } from "../../../path"
import { updated } from "../../../images"
import './SuccesUpdatedTodo.scss'


const SuccesUpdatedTodo = () => {
    return (
        <section className="succesUpdatedTodo">
            <div className="succesUpdatedTodo-container">
                <h1>Your assignment has been successfully updated</h1>
                <Link to={Path.todos} replace>
                    <img src={updated} alt="updated" width={400} height={400} className="updated-image" />
                </Link>
            </div>
        </section>
    );
}

export default SuccesUpdatedTodo;