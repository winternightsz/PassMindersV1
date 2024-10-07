# CREATE SCHEMA passMinders;
USE passMinders;

# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';

CREATE TABLE Usuario (
        id             INT NOT NULL AUTO_INCREMENT
      , email         VARCHAR(100)
    , nomeUsuario     VARCHAR(100)
    , senha          VARCHAR(50)
    ,token VARCHAR(255)
    ,contaAtiva BOOLEAN DEFAULT FALSE
    , PRIMARY KEY (id)
);

select * from Usuario;

select * from Pasta;

CREATE TABLE Pasta (
          id       INT NOT NULL AUTO_INCREMENT
        , nome     VARCHAR(100)
        , email    VARCHAR(100)
        , telefone INT 
        , senha    VARCHAR(50)
      , PRIMARY KEY (id)
);

CREATE TABLE AtividadeSuspeita (
        id                     INT NOT NULL AUTO_INCREMENT
      , descricao                VARCHAR(100)
      , quantidadeTentativas  INT
    , data                    DATE
    , PRIMARY KEY (id)
);


CREATE TABLE Conta (
        id                 INT NOT NULL AUTO_INCREMENT
      , titulo             VARCHAR(50)
      , email                VARCHAR(100)
    , senha                VARCHAR(50)
    , fotoReferencia    BLOB
    , PRIMARY KEY (id)
);


CREATE TABLE TipoConta (
        id                 INT NOT NULL AUTO_INCREMENT
      , nome                 varchar(50)
      , logoReferencia    varchar(50)
    , tipoInformacoes    varchar(300)
    , PRIMARY KEY (id)
);