
import { Path } from '../../../path'
import { deleted } from '../../../images'
import { Link } from 'react-router-dom'
import './SuccesDeleteTodo.scss'

const SuccesDeleteTodo = () => {
    return (
        <>
            <section className="succesDeletedTodo">
                <div className="succesDeletedTodo-container">
                    <h1>Your assignment has been successfully added. Click on the button to access it</h1>
                    <Link to={Path.todos} replace><img src={deleted} alt="succesDeletedTodo" width={300} height={300} className="succesDeletedTodo-image" /></Link>
                </div>
            </section>
        </>
    )
}

export default SuccesDeleteTodo
