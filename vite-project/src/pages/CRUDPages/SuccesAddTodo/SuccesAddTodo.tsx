import { Link } from "react-router-dom"
import { succes } from "../../../images"
import './SuccesAddTodo.scss'
import { Path } from "../../../path"


const SuccesAddTodo = () => {

    return (
        <>
            <section className="succes-todo">
                <div className="succes-container">
                    <h1>Your assignment has been successfully added. Click on the button to access it</h1>
                    <Link to={Path.todos} replace><img src={succes} alt="Succes" width={400} height={400} className="succes-image" /></Link>
                </div>
            </section>
        </>
    )
}

export default SuccesAddTodo
