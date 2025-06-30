import { createBrowserRouter } from "react-router";
import RootLayout from "../Page/RootLayout/RootLayout";
import Home from "../Page/Home/Home/Home";
import AuthLayout from "../Page/RootLayout/AuthLayout";
import Login from "../Page/Authentication/Login/Login";
import Register from "../Page/Authentication/Register/Register";
import TrackOrder from "../Page/Home/TrackOrder/TrackOrder";
import About from "../Page/Home/About/About";
import Error from "../Page/Home/Error/Error";
import SentParcel from "../Page/SentParcel/SentParcel";
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import DashboardLayout from '../Page/RootLayout/DashboardLayout'
import { Component } from "react";
import MyParcels from "../Page/Dashboard/MyParcels";
import Payment from "../Page/Dashboard/Payment/Payment";
import PaymentHistory from "../Page/Dashboard/PaymentHistory/PaymentHistory";
import MyProfile from "../Page/Dashboard/Profile/MyProfile";
import BeARider from "../Page/Home/BeARider/BeARider";
import PendingRiders from "../Page/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Page/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Page/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Page/Forbidden/Forbidden";
import AdminRoute from "../PrivateRoute/AdminRoute";
import AsignRider from "../Page/Dashboard/AsignRider/AsignRider";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'trackOrder',
                Component: TrackOrder,
            },
            {
                path: 'about',
                Component: About
            },
            {
                path: '/*',
                Component: Error
            },
            {
                path: 'sentParcel',
                element: <PrivateRoute>
                    <SentParcel></SentParcel>
                </PrivateRoute>
            },
            {
                path: 'beARider',
                Component: BeARider
            },
            {
                path: "forbidden",
                Component: Forbidden
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'myProfile',
                Component: MyProfile
            },
            {
                path: 'asignRider',
                element: <AdminRoute><AsignRider></AsignRider></AdminRoute>
            },
            {
                path: 'pendingRiders',
                element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
            },
            {
                path: 'activeRiders',
                element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
            },
            {
                path: 'makeAdmin',
                element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
            }
        ]
    }
]);