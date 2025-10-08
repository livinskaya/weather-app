export const StateLoading = () => {
    return (
        <div className='flex flex-col items-center justify-center bg-linear-to-r from-blue-200 to-blue-400 h-screen text-center'>
            <div className='flex flex-col items-center w-[290px] h-[104px] text-shadow-md bg-gray-100/30 rounded-[20px]'>
                <div className="flex flex-col items-center w-[290px] h-[104px] animate-pulse">
                    <div className='w-[200px] animate-pulse h-[28px] bg-gray-300/40 rounded-[10px] m-2'>
                    </div>
                    <div className='w-[120px] h-[40px] bg-gray-300/40 rounded-[10px] mb-2'>

                    </div>
                    <div className='w-[250px] h-[24px] bg-gray-300/40 rounded-[10px] mb-2'>
                    </div>
                </div>
            </div>

            <div className='flex w-[500px] h-[112px] bg-gray-100/30 rounded-[20px] m-5 p-5' >
                <div className="flex w-[500px] h-[112px] animate-pulse gap-3 overflow-x-scroll">
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                    <div className=" w-[50px] h-[72px] bg-gray-300/40 rounded-[10px]"></div>
                </div>
            </div>
        </div >
    )
}