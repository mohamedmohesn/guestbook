/* Replace with your SQL commands */
CREATE TABlE guests(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
    );