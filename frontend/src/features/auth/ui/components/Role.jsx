
import { v4 as uuidv4 } from 'uuid';

const roleArr = ["user", "owner", "deliveryBoy"]

const Role = ({loading=false,role='user',setValue}) => {

    return (
        <div className="flex mt-2 flex-col w-full gap-2 ">
            <label
                className="text-base text-gray-700 font-medium"
            >
                Role
            </label>
            <div className="flex items-center gap-4">

                {
                    roleArr.map((r) => {
                        
                        const activeRole = r === role;

                        return <button  disabled={loading} key={uuidv4()}

                        onClick={() => setValue("role", r)} type="button" className={`flex-1 px-3 cursor-pointer select-none text-sm font-medium py-2 border border-gray-300 rounded-xl text-center transition-colors duration-200

                  ${activeRole && 'bg-primary text-white hover:bg-primary-hover'}
                  `}>
                            {r}
                        </button>
                    })
                }

            </div>


        </div>
    )
}

export default Role
