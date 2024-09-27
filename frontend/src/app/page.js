// page.js (Home Page)


export const metadata = {
  title: "Home",
  description: "Pagina do Home",
};

import Image from 'next/image';
import Link from 'next/link';

export default function HomeTest() {
  return (
    <main className=" min-h-screen ">
      
      {/* Navbar */}
      <nav className="w-full bg-[#D9E1FF] py-8 flex justify-between items-center px-12">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/imagensHome/logoEscudo.png" 
              alt="PassMinders Logo"
              width={60}
              height={60}
            />
            <h1 className="text-2xl font-extrabold text-[#5673D5]">Pass<span className="text-white">Minders</span></h1>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <Link href="/login" className="text-[#5673D5] hover:text-[#3b54b5] p-4 hover:underline">
            Fazer login
          </Link>
          <Link href="/cadastro">
            <button className="bg-[#5673D5] text-white px-8 py-4 rounded-full hover:bg-[#3b54b5] transition">
              INSCREVA-SE
            </button>
          </Link>
        </div>
      </nav>
      <div className="flex items-center justify-center">
      {/* Main */}
      <section className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl p-8">
        {/* Imagem do lado esquerdo */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="/imagensHome/homeImagemGrande.png" 
            alt="Imagem"
            width={500}
            height={500}
            className="mx-auto"
          />
        </div>

        {/* Do lado */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-3xl lg:text-6xl font-extrabold text-[#4e6bdf] mb-4">
            Bem-Vindo <br></br><span className="text-black">ao PassMinders!</span>
          </h1>
          <div className="flex items-center space-x-2">
            <Image
              src="/imagensHome/logoEscudo.png" 
              alt="PassMinders Logo"
              width={100}
              height={100}
            />
            
          </div>
          <p className="text-xl lg:text-2xl text-[#a4b3f5] mb-8">
            Seu gerenciador <br></br>de logins e senhas <br></br><span className="text-2xl"> confiável e intuitivo!</span>
          </p>
          <Link href="/cadastro">
            <button className="bg-[#5673D5]  text-white px-20 py-5 rounded-full text-lg lg:text-xl hover:bg-[#3b54b5] transition">
              INSCREVA-SE
            </button>
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}


