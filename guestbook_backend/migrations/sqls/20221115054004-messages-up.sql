/* Replace with your SQL commands */
CREATE TABlE messages(
    id SERIAL PRIMARY KEY,
    guests_id integer NOT NULL,
    messagetext VARCHAR(255) NOT NULL,
    FOREIGN KEY (guests_id)
      REFERENCES guests (id)
    );