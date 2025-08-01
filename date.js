const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const initializeDB = async () => {
  const db = await open({
    filename: 'example.db',
    driver: sqlite3.Database,
  })
  return db
}

const createTable = async () => {
  const db = await initializeDB()
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Details (
    Id INTEGER,
    name VARCHAR(200),
    specialization TEXT,
    profile_image TEXT,
    availability TEXT
  );
 `
  await db.run(createTableQuery)
  console.log('table created')
}

const alterTable = async () => {
  const db = await initializeDB()
  const altetQuery = `
   ALTER TABLE
    Details 
   ADD 
    gender TEXT;
  `
  await db.run(altetQuery)
  console.log('alter done')
}

const insertTable = async () => {
  const db = await initializeDB()
  const insertQuery = `
    INSERT INTO 
      Details (Id, name, specialization, profile_image, availability, summary, experience, gender)
    VALUES (
      3,
'Dr. Ramesh Verma',
'Orthopedic Surgeon',
'https://randomuser.me/api/portraits/men/21.jpg',
'No',
'Orthopedic specialist with expertise in joint replacement surgeries and sports injury treatments. Practicing for over 15 years.',
'15 years',
'male'
    );
  `
  await db.run(insertQuery)
  console.log('inserted values')
}
insertTable()
