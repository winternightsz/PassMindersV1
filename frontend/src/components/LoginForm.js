const LoginForm = () => {
    return (
      <>
        <div className="flex items-center  justify-center max-w-2xl bg-azul60">
          <div className="w-full max-w-2xl bg-branco30 rounded-3xl shadow-lg p-8 md:p-12">
            <div className="space-y-6">
              {/* Título */}
              <h1 className="text-4xl font-extrabold text-azul10 border-b-4 border-azul10 pb-2">
                Login
              </h1>
              {/* Formulário */}
              <form className="space-y-6">
                {/* Campo de E-mail */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium text-azul10"
                  >
                    Seu e-mail ou Nome de Usuário
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="!bg-azul60 border border-gray-300 text-azul10 rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                    placeholder="email@exemplo.com ou @username"
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
                    placeholder="••••••••"
                    className="!bg-azul60 border border-gray-300 text-azul10 rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                    required
                  />
                </div>
                {/* Lembrar-me e Esqueceu a senha */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-azul60 focus:ring-3 focus:ring-azul10"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-azul10">
                        Lembrar-me
                      </label>
                    </div>
                  </div>
                  
                </div>
                {/* Botão de Sign In */}
                <button
                  type="submit"
                  className="text-branco30 !bg-azul10 hover:bg-azul60 rounded-3xl px-24 py-3 text-center font-medium text-xl mx-auto block"
                >
                  Fazer Login
                </button>
                {/* Link para Inscrever-se */}
                <div className="flex items-center flex-col">
                <p className="text-center text-base text-azul10">
                  ou{" "}
                  <a
                    href="/cadastro"
                    className="font-medium text-xl text-azul10 hover:underline"
                  >
                    Inscreva-se
                  </a>
                </p>
                <a
                    href="#"
                    className="text-sm font-medium text-gray-400 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default LoginForm;
  