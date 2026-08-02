import React from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

const TogglePasswordBtn = ({setShowPassword,showPassword}) => {
    return (
        <button
            type="button"
            onClick={() => setShowPassword((prev)=> !prev)}
            className="hover:bg-zinc-200   absolute top-0.5  right-2 rounded-full p-1.5 cursor-pointer">
            {
                showPassword ? (<IoMdEye className="size-5 text-zinc-700" />)
                    :
                    (
                        <IoMdEyeOff className="size-5 text-zinc-700" />
                    )
            }
        </button>
    )
}

export default TogglePasswordBtn
