export const StateError = () => {
    return (
        <div className='flex flex-col items-center justify-center bg-linear-to-r from-red-100 to-blue-400 h-screen text-center'>
            <div className="flex flex-col items-center bg-gray-200/25 rounded-2xl p-5">
                <div className='text-white text-shadow-md'>
                    <h1 className='text-3xl mt-4'>Sorry, something went wrong</h1>
                </div>
                <div className='bg-linear-to-l from-red-100 to-blue-400 shadow-md rounded-md p-2 hover:shadow-neutral-50 mt-3 active:' >
                    <button onClick={() => window.location.reload()} className="text-white">Reload</button>
                </div>
            </div>
        </div >
    )
}