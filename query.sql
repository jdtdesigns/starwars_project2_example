USE university_tracker;

-- Get all students by course
-- SELECT 
--   s.first_name,
--   s.last_name,
--   c.title AS course_title,
--   u.name AS university
--   FROM students s
--     JOIN courses c
--       ON s.course_id = c.id
--     JOIN universities u
--       ON c.university_id = u.id
--   WHERE c.id = 1;

-- Get all students
SELECT 
    s.id,
    s.first_name,
    s.last_name,
    c.title AS course_title,
    u.name AS university,
    CONCAT(study_group_leaders.first_name, ' ', study_group_leaders.last_name) AS study_group_leader
  FROM students s 
    JOIN courses c
      ON s.course_id = c.id
    JOIN universities u
      ON c.university_id = u.id
    LEFT JOIN students study_group_leaders
      ON s.study_group_leader_id = study_group_leaders.id;
