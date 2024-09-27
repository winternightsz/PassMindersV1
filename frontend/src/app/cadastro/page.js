
export const metadata = {
    title: "Cadastro",
    description: "Pagina do Home",
  };
  
  import Image from 'next/image';
  import Link from 'next/link';
  
  import Navbar from '@/components/CadLogNavbar';
  import CadastroForm from '@/components/CadastroForm';

  export default function CadastroPage() {
    return ( 
        <>
          <div className="bg-azul60">
            <Navbar />
            
            <CadastroForm />
            
          </div>
        </>
     );
}