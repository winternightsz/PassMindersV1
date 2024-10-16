USE passMinders;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';

-- ###############################################
-- ############### Tabelas criadas ###############
-- ###############################################

--CREATE TABLE Usuario (
--    id INT IDENTITY(1,1) NOT NULL,
--    email VARCHAR(100),
--    nomeUsuario VARCHAR(100),
--    senha VARCHAR(50),
--    token VARCHAR(255),
--    contaAtiva BIT DEFAULT 0,
--    PRIMARY KEY (id)
--);

CREATE TABLE Pasta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(40),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);


CREATE TABLE Conta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(40),
    foto_referencia VARCHAR(255),
    id_pasta INT,
    FOREIGN KEY (id_pasta) REFERENCES Pasta(id)
);


CREATE TABLE ItemConta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    rotulo VARCHAR(30),
    dado VARCHAR(50),
    id_conta INT,
    FOREIGN KEY (id_conta) REFERENCES Conta(id)
);


-- ##############################################
-- ############ Tabelas nao criadas #############
-- ##############################################

CREATE TABLE AtividadeSuspeita (
    id INT IDENTITY(1,1) NOT NULL,
    descricao VARCHAR(100),
    quantidadeTentativas INT,
    data DATE,
    PRIMARY KEY (id)
);

CREATE TABLE TipoConta (
    id INT IDENTITY(1,1) NOT NULL,
    nome VARCHAR(50),
    logoReferencia VARCHAR(50),
    tipoInformacoes VARCHAR(300),
    PRIMARY KEY (id)
);
