// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { Path } from './path'
// // import Todos from './pages/Todos/Todos'
// // import Register from './pages/Register/Register'
// // import Login from './pages/Login/Login'
// import Layout from './components/Layout/Layout'
// // import Profile from './pages/Profile/Profile'
// // import HomePage from './pages/HomePage/HomePage'
// // import SuccesUpdatedTodo from './pages/CRUDPages/SuccesUpdatedTodo/SuccesUpdatedTodo'
// // import SuccesDeleteTodo from './pages/CRUDPages/SuccesDeleteTodo/SuccesDeleteTodo'
// // import SuccesAddTodo from './pages/CRUDPages/SuccesAddTodo/SuccesAddTodo'
// import { Suspense, lazy } from 'react';
// import { loader } from './images';


// const LazyTodos = lazy(() => import('./pages/Todos/Todos'));
// const LazyRegister = lazy(() => import('./pages/Register/Register'));
// const LazyLogin = lazy(() => import('./pages/Login/Login'));
// const LazyProfile = lazy(() => import('./pages/Profile/Profile'));
// const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage'));
// const LazySuccesUpdatedTodo = lazy(() => import('./pages/CRUDPages/SuccesUpdatedTodo/SuccesUpdatedTodo'));
// const LazySuccesDeleteTodo = lazy(() => import('./pages/CRUDPages/SuccesDeleteTodo/SuccesDeleteTodo'));
// const LazySuccesAddTodo = lazy(() => import('./pages/CRUDPages/SuccesAddTodo/SuccesAddTodo'));

// const router = createBrowserRouter([
//   {
//     path: Path.home,
//     element: (
//       <Suspense fallback={loader}>
//         <LazyHomePage />
//       </Suspense>
//     ),
//   },
//   {
//     path: Path.register,
//     element: (
//       <Suspense fallback={loader}>
//         <LazyRegister />
//       </Suspense>
//     ),
//   },
//   {
//     path: Path.login,
//     element: (
//       <Suspense fallback={loader}>
//         <LazyLogin />
//       </Suspense>
//     ),
//   },
//   {
//     path: Path.profile,
//     element: (
//       <Layout>
//         <Suspense fallback={loader}>
//           <LazyProfile />
//         </Suspense>
//       </Layout>
//     ),
//   },
//   {
//     path: Path.todos,
//     element: (
//       <Layout>
//         <Suspense fallback={loader}>
//           <LazyTodos />
//         </Suspense>
//       </Layout>
//     ),
//   },
//   {
//     path: Path.SuccesAddTodo,
//     element: (
//       <Layout>
//         <Suspense fallback={loader}>
//           <LazySuccesAddTodo />
//         </Suspense>
//       </Layout>
//     ),
//   },
//   {
//     path: Path.SuccesUpdatedTodo,
//     element: (
//       <Layout>
//         <Suspense fallback={loader}>
//           <LazySuccesUpdatedTodo />
//         </Suspense>
//       </Layout>
//     ),
//   },
//   {
//     path: Path.SuccesDeletedTodo,
//     element: (
//       <Layout>
//         <Suspense fallback={loader}>
//           <LazySuccesDeleteTodo />
//         </Suspense>
//       </Layout>
//     ),
//   },
// ]);

// const App = () => {
//   return (
//     <Suspense fallback={loader}>
//       <RouterProvider router={router} />
//     </Suspense>
//   );
// };

// export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Path } from './path';
import Layout from './components/Layout/Layout';
import { Suspense, lazy } from 'react';
import { loader } from './images';

const LazyTodos = lazy(() => import('./pages/Todos/Todos'));
const LazyRegister = lazy(() => import('./pages/Register/Register'));
const LazyLogin = lazy(() => import('./pages/Login/Login'));
const LazyProfile = lazy(() => import('./pages/Profile/Profile'));
const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LazySuccesUpdatedTodo = lazy(() => import('./pages/CRUDPages/SuccesUpdatedTodo/SuccesUpdatedTodo'));
const LazySuccesDeleteTodo = lazy(() => import('./pages/CRUDPages/SuccesDeleteTodo/SuccesDeleteTodo'));
const LazySuccesAddTodo = lazy(() => import('./pages/CRUDPages/SuccesAddTodo/SuccesAddTodo'));

const router = createBrowserRouter([
  {
    path: Path.home,
    element: <LazyHomePage />,
  },
  {
    path: Path.register,
    element: <LazyRegister />,
  },
  {
    path: Path.login,
    element: <LazyLogin />,
  },
  {
    path: Path.profile,
    element: (
      <Layout>
        <LazyProfile />
      </Layout>
    ),
  },
  {
    path: Path.todos,
    element: (
      <Layout>
        <LazyTodos />
      </Layout>
    ),
  },
  {
    path: Path.SuccesAddTodo,
    element: (
      <Layout>
        <LazySuccesAddTodo />
      </Layout>
    ),
  },
  {
    path: Path.SuccesUpdatedTodo,
    element: (
      <Layout>
        <LazySuccesUpdatedTodo />
      </Layout>
    ),
  },
  {
    path: Path.SuccesDeletedTodo,
    element: (
      <Layout>
        <LazySuccesDeleteTodo />
      </Layout>
    ),
  },
]);

const App = () => {
  return (
    <Suspense
      fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(to bottom, #f0f4f8, #d9e2ec)', // Градиент фона
          color: '#333',
          fontSize: '1.5rem',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          position: 'relative',
        }}>
          <img
            src={loader}
            alt="Loading..."
            style={{
              width: '80px', // Ширина изображения
              height: '80px', // Высота изображения
              animation: 'spin 1s linear infinite', // Анимация вращения
            }}
          />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
