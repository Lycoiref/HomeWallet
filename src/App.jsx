import './App.css'
import Home from './views/Home/Home'
import Setting from './views/Setting/Setting'
import Tally from './views/Tally/Tally'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/setting",
        element: <Setting />,
    },
    {
        path: "/tally",
        element: <Tally />,
    },
    // 404Page
    {
        path: "*",
        element: <div className='not-found'>Opps,It seems the page doesn&rsquo;t exist</div>,
    },
])

function App() {

    return (
        <div className="page">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
