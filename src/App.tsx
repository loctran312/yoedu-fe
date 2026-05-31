import { RouterProvider } from "react-router-dom"
import AntdProvider from "./app/providers/antd/AntdProvider"
import ThemeProvider from "./app/providers/theme/ThemeProvider"
import { router } from "./app/router/routes"
import { store } from "./app/redux/store"
import { Provider } from "react-redux"

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntdProvider>
          <RouterProvider router={router} />
          <div>YOEDU Project</div>
        </AntdProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App