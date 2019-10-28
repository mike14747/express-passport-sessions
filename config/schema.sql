DROP DATABASE IF EXISTS testDB2;
CREATE DATABASE testDB2;
USE testDB2;

set foreign_key_checks=0;

-- --------------------------------------------------------

CREATE TABLE sessions (
    session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
    expires int(11) unsigned NOT NULL,
    data mediumtext COLLATE utf8mb4_bin,
    PRIMARY KEY (session_id)
);

-- --------------------------------------------------------

CREATE TABLE users (
    user_id int(6) NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    access_level tinyint(1) UNSIGNED DEFAULT 1,
    active boolean DEFAULT 1,
    PRIMARY KEY (user_id)
);

-- --------------------------------------------------------

set foreign_key_checks=1;
