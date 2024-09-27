

import Image from 'next/image';



const Navbar = () => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex justify-between md:items-center bg-branco30 mx-auto p-4 md:p-8">
                
                <a href="/"  className="bg-blue-500 text-black" >
                    <div className="flex items-center ">
                        <Image
                        src="/imagensHome/logoEscudo.png" 
                        alt="PassMinders Logo"
                        width={40}
                        height={40}
                        />
                    </div>    
                </a>
                
                <a href="/" className="flex items-center ">
                    <div className="flex items-center space-x-2">
                        <Image
                        src="/imagensHome/logoEscudo.png" 
                        alt="PassMinders Logo"
                        width={50}
                        height={50}
                        />
                        <h1 className="text-4xl font-bold text-azul10">Pass<span className="text-azul60">Minders</span></h1>
                    </div>
                </a>
                <div className="hidden md:block bg-blue-300">
                </div>
            </div>
        </nav>
    );
}
export default Navbar;





{/* <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button> */}