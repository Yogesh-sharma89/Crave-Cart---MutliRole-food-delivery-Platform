import { lazy, Suspense } from 'react'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router'

import ProtectedRoute from './protectedRoute'

import PublicRoute from './PublicRoute'


import FullScreenLoader from '../features/auth/components/Loader'

import RoleRoute from './RoleRoute'
import CraveCartErrorPage from '../page/CraveCartErrorPage'
import ExpiredLinkPage from '../page/ExpiredLinkPage'

import { toast } from 'sonner'
import ShopDetailPage from '../features/Dashboards/Owner-dashbaord/pages/Shop-Detail-Page/ShopDetailPage'
import RolbasedRoute from './RolbasedRoute'
import { queryClient } from '../provider/QueryProvider'
import CheckResetTokenApi from '../features/auth/api/CheckResetToken'


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
const UserDashboard = lazy(() => import("../features/Dashboards/User-dashboard/ui/pages/UserDashboard"));
const EditShop = lazy(() => import("../features/Dashboards/Owner-dashbaord/pages/EditShop"))

//profile 
const ProfilePage = lazy(() => import("../features/profile/page/ProfilePage"));
const ChangePasswordPage = lazy(() => import("../features/profile/page/ChangePassword"))
const AccountRecoveryPage = lazy(() => import("../features/recover-account/ui/pages/AccountRecovery"));

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

                        const token = params.token?.trim();

                        if (!token) {
                            return redirect("/expire-link-page?reason=invalid_token")
                        }

                        const data = await queryClient.ensureQueryData({
                            queryKey: ['reset-token', token],
                            queryFn: () => CheckResetTokenApi(token),
                            staleTime: 5 * 60 * 1000
                        })

                        if (!data || !data.isTokenValid) {
                            return redirect("/expire-link-page?reason=invalid_token");
                        }

                        if (data.message) toast.success(data.message);

                        return { token }
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
                element: <RolbasedRoute />
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
                        },
                        {
                            path: "shops/:shopId",
                            element: <Suspense fallback={<FullScreenLoader />}>
                                <ShopDetailPage />
                            </Suspense>
                        }
                    ]
            },
            {
                path: "delivery-boy",
                element: <RoleRoute allowedRoles={["deliveryBoy"]} />,
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
            },
            {
                path: "profile",
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<FullScreenLoader />}>
                            <ProfilePage />
                        </Suspense>
                    },
                    {
                        path: "change-password",
                        element: <Suspense fallback={<FullScreenLoader />}>
                            <ChangePasswordPage />
                        </Suspense>
                    }
                ]
            },
            {

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
    },
    {
        path: "/recover-account",
        errorElement: <CraveCartErrorPage />,
        element: <Suspense fallback={<FullScreenLoader />}>
            <AccountRecoveryPage />
        </Suspense>
    }
])

const AppRoutes = () => {


    return (
        <RouterProvider router={router} />
    )
}

export default AppRoutes
