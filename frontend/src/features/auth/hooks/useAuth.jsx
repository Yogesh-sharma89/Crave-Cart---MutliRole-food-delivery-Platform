import {useQueryClient,useMutation} from "@tanstack/react-query"
import { LoginApi, SignupApi } from "../api/auth";

const useAuth = ()=>{

    const queryClient = useQueryClient();

    const signupMutation = useMutation({
        mutationKey:['singup'],
        mutationFn:SignupApi,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["current-user"]
            })
        }
    })

    const loginMutation = useMutation({
        mutationKey:['login'],
        mutationFn:LoginApi,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["current-user"]
            })
        }
    })

    return {
        Signup:signupMutation.mutateAsync,
        signupPending:signupMutation.isPending,
        Login:loginMutation.mutateAsync,
        loginPending:loginMutation.isPending
    }
}


export default useAuth;