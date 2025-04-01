import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-Trip/index.jsx'
import Header from './components/custom/Header.jsx'
import Footer from './components/custom/Footer.jsx'
import { Toaster } from "@/components/ui/sonner"
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import TripId from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripid",
    element: <TripId />,
  },
  {
    path: "/view-trip/:tripid",
    element: <TripId />,
  },
  {
    path: "my-trips",
    element: <MyTrips />,
  },
])

createRoot(document.getElementById('root')).render(
  
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <StrictMode>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <RouterProvider router={router} />
          </main>
          <Footer />
        </div>
        <Toaster />
      </StrictMode>
    </GoogleOAuthProvider>
)
