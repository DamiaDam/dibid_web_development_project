CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT NOT NULL,
    messageText VARCHAR(64) NOT NULL,
    timeStamp TIMESTAMP NOT NULL,
    senderUsername VARCHAR(64) NOT NULL,
    receiverUsername VARCHAR(64) NOT NULL,
    FOREIGN KEY(senderUsername) REFERENCES users(username),
    FOREIGN KEY(receiverUsername) REFERENCES users(username),
    PRIMARY KEY (id)
);