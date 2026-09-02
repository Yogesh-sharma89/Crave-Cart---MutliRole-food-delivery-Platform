import { useMutation, useQueryClient } from "@tanstack/react-query"
import DeleteAccountApi from "../../api/deleteAccount";

const useAccountDeleteMutation = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-account'],
        mutationFn: DeleteAccountApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["current-user"]
            })
        }
    })
}

export default useAccountDeleteMutation
