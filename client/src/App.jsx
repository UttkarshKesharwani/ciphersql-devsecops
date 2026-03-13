import React from 'react';
import AssignmentAttemptPage from './pages/AssignmentAttemptPage';
import Navbar from './components/NavBar';
import AssignmentList from './components/AssignmentList';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/Login';

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <AssignmentList />
            },
            {
                path: "/solve/:title",
                element: <AssignmentAttemptPage />
            },

        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
]);

function App() {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
