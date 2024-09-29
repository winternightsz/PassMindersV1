"use client";

const ConfirmacaoPendente = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-azul60">
      <div className="w-full max-w-2xl bg-branco30 rounded-3xl shadow-lg p-8 md:p-16">
        <h1 className="text-4xl xl:text-6xl font-bold text-azul10">
          Quase la!
        </h1>
        <p className="text-lg text-azul60 mt-4">
          Por favor, verifique seu email e clique no link de confirmacao que enviamos para completar o seu cadastro.
        </p>
      </div>
    </div>
  );
};

export default ConfirmacaoPendente;
