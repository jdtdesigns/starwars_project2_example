USE university_tracker;

INSERT INTO universities (name, location) VALUES 
  ('Rutgers', 'New Jersey');

INSERT INTO courses (title, university_id, start_date, end_date) VALUES 
  ('Full Stack Web Development', 1, '2023-02-27', '2023-05-19');

INSERT INTO students (
    first_name, 
    last_name, 
    course_id, 
    study_group_leader_id
  ) VALUES
      ('Megan', 'Mathis', 1, NULL),
      ('Austen', 'Tangen', 1, 1),
      ('Mizael', 'Gonzalez', 1, 1),
      ('Keziah', 'Changuin', 1, 1),
      ('Ferny', 'Castro', 1, NULL),
      ('Damian', 'Smith', 1, 5),
      ('James', 'Sciacca', 1, 5);
