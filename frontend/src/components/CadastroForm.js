const CadastroForm = () => {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-azul60">
          <div className="w-full max-w-2xl bg-branco30 rounded-3xl shadow-lg p-8 md:p-16">
            <div className="space-y-6">
              {/* Título */}
              <h1 className="text-4xl xl:text-6xl font-bold text-azul10 border-b-4 border-azul10 pb-2">
                Criar uma conta
              </h1>
              {/* Formulário */}
              <form className="space-y-6">
                {/* Campo de E-mail */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium text-azul10"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg !focus:ring-azul10 !focus:border-azul10 block w-full p-2.5"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                {/* Campo de Nome de Usuário */}
                <div>
                  <label
                    htmlFor="nome"
                    className="block mb-2 text-base font-medium text-azul10"
                  >
                    Nome de Usuário
                  </label>
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                    placeholder="@username"
                    required
                  />
                </div>
                {/* Campo de Senha */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-azul10"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                    required
                  />
                </div>
                {/* Campo de Confirmar Senha */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-base font-medium text-azul10"
                  >
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="********"
                    className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="terms" 
                        aria-describedby="terms" 
                        type="checkbox" 
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 !focus:ring-azul10" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">
                            Aceito os  
                            <a className="font-medium text-primary-600 hover:underline" href="#"> Termos e Condições </a>
                        </label>
                    </div>
                </div>
                {/* Botão de Inscrição */}
                <button
                    type="submit"
                    className="text-branco30 !bg-azul10 hover:bg-azul60 rounded-3xl px-16 py-3 text-center font-medium text-xl mx-auto block">
                        INSCREVA-SE
                </button>

                {/* Link para Login */}
                <p className="text-center text-base text-azul60">
                  ou{" "}
                  <a
                    href="/login"
                    className="text-azul10 hover:underline"
                  >
                    Fazer login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CadastroForm;
  