import React,{lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";
import HeaderComponent from "./components/HeaderComponent";
import BodyComponent from "./components/BodyComponent";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import ResMenu from "./components/ResMenu";
import Cart from "./components/Cart";
import { createBrowserRouter ,RouterProvider, Outlet} from "react-router-dom";
import { Provider } from "react-redux"; 
import  appStore  from "./utils/appStore";
import Success from "./components/Success";


//<Rescard resData= {resList[0]} />

//App Component

const AppComponent = () => {
    return (
        <Provider store={appStore}> 
            <div>  
                <HeaderComponent /> 
                <div className="container page-body">
                    <Outlet />
                </div>
            </div>
        </Provider>
    )
}

//Lazy Loading = code splitting = dynamic bundling = on demand loading (all these are same)
const Grocery = lazy(() => import("./components/Grocery"));
//Routing configuration - some info that will define or tell the browser what will happen a specific path.
const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppComponent />,
        errorElement:<Error />,
        children:[
            {
                path:"/",
                element: <BodyComponent />
            },
            {
                path:"/about",
                element:<About />
            },
            {
                path:"/contact",
                element:<Contact />
            },
            {
                path:"/cart",
                element:<Cart />
            },
            {
                path:"/grocery",
                element:<Suspense fallback={<div className="container"><h1>Loading...</h1></div>}><Grocery /></Suspense>
            },
            {
                path:"/restaurants/:resId",
                element:<ResMenu />,
            },
            {
                path:"/success",
                element: <Success />
            }
                
        ]
    }
])
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);




