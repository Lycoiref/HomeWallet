import './App.css'
import Home from './views/Home/Home'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    // 404Page
    {
        path: "*",
        element: <div className='not-found'>Opps,It seems the page doesn&rsquo;t exist</div>,
    },
]);

function App() {

    return (
        <div className="page">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
