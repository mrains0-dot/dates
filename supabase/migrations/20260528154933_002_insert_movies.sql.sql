/*
  # Insert Initial Movies for 2026

  1. New Releases - 2026 Movies
    - Latest blockbuster movies
    - Rotated weekly using week_number
  
  2. Classic Romance Movies
    - Timeless favorites
    - Popular date movies
*/

INSERT INTO movies (title, year, genre, category, week_number) VALUES
('Captain America: Brave New World', '2026', 'Action', 'new_release', 1),
('Mission: Impossible - The Final Reckoning', '2026', 'Action/Thriller', 'new_release', 1),
('Snow White', '2026', 'Fantasy/Musical', 'new_release', 1),
('The Batman Part II', '2026', 'Action/Drama', 'new_release', 1),
('Avatar 3', '2026', 'Sci-Fi/Adventure', 'new_release', 1),
('Jurassic World 4', '2026', 'Action/Adventure', 'new_release', 1),
('Fantastic Four', '2026', 'Action/Sci-Fi', 'new_release', 1),
('Blade', '2026', 'Action/Horror', 'new_release', 1),
('The Fantastic Four: First Steps', '2026', 'Action/Adventure', 'new_release', 2),
('Moana 2', '2026', 'Animation', 'new_release', 2),
('Lilo & Stitch', '2026', 'Animation/Family', 'new_release', 2),
('Thunderbolts', '2026', 'Action', 'new_release', 2),
('How to Train Your Dragon', '2026', 'Animation/Fantasy', 'new_release', 3),
('The Hunger Games: Sunrise on the Reaping', '2026', 'Dystopian/Drama', 'new_release', 3),
('Tron: Ares', '2026', 'Sci-Fi/Action', 'new_release', 3),
('Masters of the Universe', '2026', 'Fantasy/Action', 'new_release', 4);

INSERT INTO movies (title, year, genre, category) VALUES
('The Notebook', '2004', 'Romance', 'classic'),
('La La Land', '2016', 'Romance/Musical', 'classic'),
('Titanic', '1997', 'Romance/Drama', 'classic'),
('When Harry Met Sally', '1989', 'Romance/Comedy', 'classic'),
('Pride and Prejudice', '2005', 'Romance/Drama', 'classic'),
('Casablanca', '1942', 'Romance', 'classic'),
('Pretty Woman', '1990', 'Romance/Comedy', 'classic'),
('Eternal Sunshine of the Spotless Mind', '2004', 'Romance/Sci-Fi', 'classic'),
('Before Sunset', '2004', 'Romance/Drama', 'classic'),
('About Time', '2013', 'Romance/Sci-Fi', 'classic'),
('The Princess Bride', '1987', 'Romance/Adventure', 'classic'),
('Roman Holiday', '1953', 'Romance', 'classic'),
('Notting Hill', '1999', 'Romance/Comedy', 'classic'),
('Crazy, Stupid, Love', '2011', 'Romance/Comedy', 'classic'),
('500 Days of Summer', '2009', 'Romance/Drama', 'classic');
