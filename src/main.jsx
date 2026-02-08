import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes'
import Aos from 'aos'
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthContex/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

Aos.init()
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster position='right-top'></Toaster>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
