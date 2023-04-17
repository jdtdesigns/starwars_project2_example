DROP DATABASE IF EXISTS university_tracker;
CREATE DATABASE university_tracker;

USE university_tracker;

CREATE TABLE universities (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  location VARCHAR(150) NOT NULL
);

CREATE TABLE courses (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  university_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (university_id)
    REFERENCES universities (id)
    ON DELETE CASCADE
);

CREATE TABLE students (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  course_id INT NOT NULL,
  study_group_leader_id INT,
  FOREIGN KEY (course_id)
    REFERENCES courses (id)
    ON DELETE CASCADE,
  FOREIGN KEY (study_group_leader_id)
    REFERENCES students (id)
    ON DELETE SET NULL
);