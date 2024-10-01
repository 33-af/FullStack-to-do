
import { Link } from 'react-router-dom'
import './header.scss'
import { Path } from '../../path'




const HomePage = () => {
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <h1 >Task Manager</h1>
                    <div className="right">
                        <Link to={Path.profile} className='header-link'>Open Task Manager</Link>
                        <button type="button" className="start-free__button">Start Free</button>

                    </div>
                </div>
            </header>
            <main>
                <section className='wrapper'>
                    <div className="wrapepr-container">

                        <div className="wrapper-left">
                            <h2 className='wrapper-title'>Organize your work and life.</h2>
                            <p className='wrapper-subtitle'>Make life easier for yourself and your team with the world's #1 task manager and to-do list.</p>
                            <span className='wrapper-rating'>374k+ ★★★★★ ratings</span>

                            <button className='wrapper-tarif__buton'>Start with Pro Tarif</button>
                        </div>

                        <div className="wrapper-right">
                           
                        </div>
                    </div>
                </section>
            </main>
        </>

    )
}

export default HomePage
