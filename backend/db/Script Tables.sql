USE passMinders;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';

-- ###############################################
-- ############### Tabelas criadas ###############
-- ###############################################

CREATE TABLE Usuario (
    id INT IDENTITY(1,1) NOT NULL,
    email VARCHAR(100),
    nomeUsuario VARCHAR(100),
    senha VARCHAR(50),
    token VARCHAR(255),
    contaAtiva BIT DEFAULT 0,
    PRIMARY KEY (id)
);

SELECT * FROM Usuario;

CREATE TABLE Pasta (
    id INT IDENTITY(1,1) NOT NULL,
    nome VARCHAR(100),
    PRIMARY KEY (id)
);

SELECT * FROM Pasta;

-- ##############################################
-- ############ Tabelas n�o criadas #############
-- ##############################################

CREATE TABLE AtividadeSuspeita (
    id INT IDENTITY(1,1) NOT NULL,
    descricao VARCHAR(100),
    quantidadeTentativas INT,
    data DATE,
    PRIMARY KEY (id)
);

CREATE TABLE Conta (
    id INT IDENTITY(1,1) NOT NULL,
    titulo VARCHAR(50),
    email VARCHAR(100),
    senha VARCHAR(50),
    fotoReferencia VARBINARY(MAX), -- para dados bin�rios
    PRIMARY KEY (id)
);

CREATE TABLE TipoConta (
    id INT IDENTITY(1,1) NOT NULL,
    nome VARCHAR(50),
    logoReferencia VARCHAR(50),
    tipoInformacoes VARCHAR(300),
    PRIMARY KEY (id)
);
