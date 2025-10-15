import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'

const Images = lazy(() => import("./pages/ImagesPage.jsx"));
const ImageDetail = lazy(() => import("./pages/ImageDetailPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFoundPage.jsx"));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/photos",
    element: <Images />,
  },
  {
    path: "/photos/:id",
    element: <ImageDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
