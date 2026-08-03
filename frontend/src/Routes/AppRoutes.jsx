import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router'

import ProtectedRoute from './protectedRoute'

import PublicRoute from './PublicRoute'

import useAuthStore from '../store/auth.store'

import FullScreenLoader from '../features/auth/components/Loader'

import RoleRoute from './RoleRoute'
import CraveCartErrorPage from '../page/CraveCartErrorPage'
import ExpiredLinkPage from '../page/ExpiredLinkPage'
import useAuth from '../hooks/useAuth'
import { toast } from 'sonner'


const LogingPage = lazy(() => import("../page/LoginPage"));
const SignupPage = lazy(() => import("../page/SignupPage"));
const CompleteProfile = lazy(() => import("../page/CompleteProfile"));
const ForgotPassword = lazy(() => import("../page/ForgotPassword"));
const ResetPassword = lazy(() => import("../page/ResetPassword"));
const NotFoundPage = lazy(() => import("../page/NotFoundPage"));

const OwnerDashboard = lazy(() => import("../features/Dashboards/Owner-dashbaord/OwnerDashboard"));
const OwnerAllShops = lazy(() => import("../features/Dashboards/Owner-dashbaord/pages/OwnerAllShops"));
const CreateShop = lazy(() => import("../features/Dashboards/Owner-dashbaord/pages/CreateShop"));
const DeliveryBoyDashboard = lazy(() => import("../features/Dashboards/DeliveryBoyDashboard"));
const UserDashboard = lazy(() => import("../features/Dashboards/UserDashboard"));
const EditShop = lazy(() => import("../features/Dashboards/Owner-dashbaord/pages/EditShop"))

const router = createBrowserRouter([

    {
        path: "/",
        element: <PublicRoute />,
        errorElement: <CraveCartErrorPage />,
        children: [
            {
                path: "login",
                element: <Suspense fallback={<FullScreenLoader />}>
                    <LogingPage />
                </Suspense>
            },
            {
                path: "signup",
                element: <Suspense fallback={<FullScreenLoader />}>
                    <SignupPage />
                </Suspense>
            },
            {
                path: "forgot-password",
                element: <Suspense fallback={<FullScreenLoader />}>
                    <ForgotPassword />
                </Suspense>
            },
            {
                path: "reset-password/:token",
                element: <Suspense fallback={<FullScreenLoader />}>
                    <ResetPassword />
                </Suspense>,
                loader: async ({ params }) => {
                    try {

                        if (!params.token) {
                            return redirect("/expire-link-page?reason=invalid_token")
                        }
                        console.log(params.token);

                        const { isTokenValid, message } = await useAuthStore.getState().checkToken(params.token)

                        console.log("token valid", isTokenValid)
                        console.log(message);

                        if (!isTokenValid) {
                            return redirect('/expire-link-page?reason=invalid_token');
                        }

                        { message && toast(message) }

                        return { isTokenValid }
                    } catch (err) {
                        return redirect("/expire-link-page?reason=loader_error")
                    }

                },
                hydrateFallbackElement: <FullScreenLoader text='Checking reset token...' />
            }
        ]

    },

    {
        path: "",
        element: <ProtectedRoute />,
        errorElement: <CraveCartErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={'/user'} replace />
            },


            {
                path: "owner",
                element: <RoleRoute allowedRoles={["owner"]} />,
                children
                    : [
                        {
                            index: true,
                            element: <Suspense fallback={<FullScreenLoader />}>
                                <OwnerDashboard />
                            </Suspense>
                        },
                        {
                            path: "shops",
                            element: <Suspense fallback={<FullScreenLoader />}>
                                <OwnerAllShops />
                            </Suspense>
                        },
                        {
                            path: "shops/new",
                            element: <Suspense fallback={<FullScreenLoader />}>
                                <CreateShop />
                            </Suspense>
                        },
                        {
                            path: "shops/:shopId/edit",
                            element: <Suspense fallback={<FullScreenLoader />}>
                                <EditShop />
                            </Suspense>
                        }
                    ]
            },
            {
                path: "delivery-boy",
                element: <RoleRoute allowedRoles={["delivery-boy"]} />,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<FullScreenLoader />}>
                            <DeliveryBoyDashboard />
                        </Suspense>
                    }
                ]
            },
            {
                path: "user",
                element: <RoleRoute allowedRoles={["user"]} />,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<FullScreenLoader />}>
                            <UserDashboard />
                        </Suspense>
                    }
                ]
            }
        ]

    },
    {

        path: "/complete-profile",
        element: <Suspense fallback={<FullScreenLoader />}>
            <CompleteProfile />
        </Suspense >


    }
    ,
    {
        path: "*",
        element: <NotFoundPage />
    },
    {
        path: "/expire-link-page",
        element: <Suspense fallback={<FullScreenLoader />}>
            <ExpiredLinkPage />
        </Suspense>
    }
])

const AppRoutes = () => {


    return (
        <RouterProvider router={router} />
    )
}

export default AppRoutes
