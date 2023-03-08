CREATE TABLE utilisateur(
    id_pseudo INT,
    pseudo VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(50),
    age VARCHAR(50),
    createdAt VARCHAR(50),
    updatedAt VARCHAR(50),
    is_admin BOOLEAN,
    PRIMARY KEY(id_pseudo)
);

CREATE TABLE token(
    id_token INT,
    refresh_token VARCHAR(50),
    id_pseudo INT NOT NULL,
    PRIMARY KEY(id_token),
    FOREIGN KEY(id_pseudo) REFERENCES utilisateur(id_pseudo)
);

CREATE TABLE parcours(
    id_parcours INT,
    name VARCHAR(50),
    PRIMARY KEY(id_parcours)
);

CREATE TABLE points(
    id_point INT,
    name VARCHAR(50),
    main_description TEXT,
    small_description VARCHAR(255),
    lon DECIMAL(8,6),
    lat DECIMAL(8,6),
    qrcode VARCHAR(255),
    PRIMARY KEY(id_point)
);

CREATE TABLE badge(
    id_badge INT,
    name VARCHAR(50),
    image VARCHAR(50),
    id_point INT NOT NULL,
    PRIMARY KEY(id_badge),
    UNIQUE(id_point),
    FOREIGN KEY(id_point) REFERENCES points(id_point)
);

CREATE TABLE simple_question(
    id_simple_question INT,
    question VARCHAR(50),
    response VARCHAR(255),
    PRIMARY KEY(id_simple_question)
);

CREATE TABLE qcm(
    id_qcm INT,
    question VARCHAR(50),
    correct_response VARCHAR(255),
    optionA VARCHAR(50),
    optionB VARCHAR(50),
    optionC VARCHAR(50),
    optionD VARCHAR(50),
    PRIMARY KEY(id_qcm)
);

CREATE TABLE animation(
    id_animation INT,
    name VARCHAR(50),
    id_point INT NOT NULL,
    PRIMARY KEY(id_animation),
    FOREIGN KEY(id_point) REFERENCES points(id_point)
);

CREATE TABLE scanner(
    id_pseudo INT,
    id_point INT,
    PRIMARY KEY(id_pseudo, id_point),
    FOREIGN KEY(id_pseudo) REFERENCES utilisateur(id_pseudo),
    FOREIGN KEY(id_point) REFERENCES points(id_point)
);

CREATE TABLE associer(
    id_parcours INT,
    id_point INT,
    PRIMARY KEY(id_parcours, id_point),
    FOREIGN KEY(id_parcours) REFERENCES parcours(id_parcours),
    FOREIGN KEY(id_point) REFERENCES points(id_point)
);

CREATE TABLE poser(
    id_simple_question INT,
    id_animation INT,
    PRIMARY KEY(id_simple_question, id_animation),
    FOREIGN KEY(id_simple_question) REFERENCES simple_question(id_simple_question),
    FOREIGN KEY(id_animation) REFERENCES animation(id_animation)
);

CREATE TABLE detenir(
    id_qcm INT,
    id_animation INT,
    PRIMARY KEY(id_qcm, id_animation),
    FOREIGN KEY(id_qcm) REFERENCES Qcm(id_qcm),
    FOREIGN KEY(id_animation) REFERENCES animation(id_animation)
);

CREATE TABLE obtenir(
    id_pseudo INT,
    id_badge INT,
    PRIMARY KEY(id_pseudo, id_badge),
    FOREIGN KEY(id_pseudo) REFERENCES utilisateur(id_pseudo),
    FOREIGN KEY(id_badge) REFERENCES badge(id_badge)
);
