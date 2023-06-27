CREATE TABLE IF NOT EXISTS USER_TABLE (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    CONSTRAINT USER_PK PRIMARY KEY (id)
);