export const metadata = {
  title: "Login",
  description: "Pagina do Home",
};

import Image from 'next/image';

import Navbar from '@/components/CadLogNavbar';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return ( 
    <>
      <div className="bg-azul60 min-h-screen">
        <Navbar />
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly w-full max-w-6xl p-8 mx-auto lg:gap-x-12">
          
          {/* Seção da Imagem */}
          <div className="hidden md:block w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <Image
              src="/imagensLogin/loginImagemGrande.png" 
              alt="Imagem"
              width={500}
              height={500}
              className="max-w-full h-auto"
            />
          </div>

          {/* Seção do Formulário */}
          <div className="w-full">
            <LoginForm />
          </div>
        </div>  
      </div>
    </>
  );
}
