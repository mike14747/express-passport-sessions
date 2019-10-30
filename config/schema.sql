DROP DATABASE IF EXISTS testDB;
CREATE DATABASE testDB;
USE testDB;

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
    username varchar(30) NOT NULL UNIQUE,
    password varchar(128) NOT NULL,
    email varchar(60) DEFAULT 'test@test.com',
    address varchar(80) DEFAULT '123 Main Street',
    city varchar(60) DEFAULT 'Somecity',
    state varchar(30) DEFAULT 'OH',
    zip varchar(20) DEFAULT '44111',
    country varchar(30) DEFAULT 'USA',
    phone varchar(20) DEFAULT '800-555-1212',
    access_level tinyint(1) UNSIGNED DEFAULT 1,
    active boolean DEFAULT 1,
    PRIMARY KEY (user_id)
);

-- --------------------------------------------------------

set foreign_key_checks=1;
