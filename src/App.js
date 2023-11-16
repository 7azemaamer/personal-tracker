import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Summary from './Components/Summary/Summary';
import NotFound from './Components/NotFound/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import AmountContextProvider from './TrackerContext/AmountContext';

export default function App() {
  const routes = createHashRouter([
    {path:'/', element: <Layout/>, children:[
      {path: '/', element:<Home/> , index:true},
      {path: 'summary', element:<Summary/>},
      {path: '*', element:<NotFound/>}
    ]}
  ])
  return <>
  <AmountContextProvider>
    <RouterProvider router={routes}>
    </RouterProvider>
  </AmountContextProvider>
  </>
}


