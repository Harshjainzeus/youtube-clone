
import './App.css'
import Header from './components/Header/Header'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import MainContainer from './components/Body/MainContainer/MainContainer'
import WatchVideo from './components/Body/WatchVideo/WatchVideo'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,// element in which outlet will be there or whose place we provided router
    children: [
      {
        path: "",
        element: <MainContainer />,
      },
      {
          path: "watch",
          element: <WatchVideo />,
      }
    ],
  },
]);

function App() {

  return (
    <Provider store={appStore}>
      <div>
        <Header />
        {/** need to provide router to parent of outlet ie body so needed here */}
        <RouterProvider router={router} />
      </div>
    </Provider>
  )
}

export default App
