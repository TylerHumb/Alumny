import sqlite3   
from sqlite3 import Error
  
# Create a connection to sqlite database
def createConnection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(f"Connection to {db_file} database successful.")
    except Error as e:
        print(f"Error: {e}")
    return conn

# Closes the connection to the database
def closeConnection(conn):
    if conn:
        conn.close()
        print("Database connection closed.")

def addEmployer(conn, employer):
    check_sql = ''' SELECT Employer_ID FROM Employer WHERE Name = ? '''
    cur = conn.cursor()
    cur.execute(check_sql, (employer,))
    user = cur.fetchone()
    if user:
        return user[0]
    else:
        sql = ''' INSERT INTO Employer(Name) VALUES(?) '''
        cur.execute(sql, (employer,))
        conn.commit()
        return cur.lastrowid
    
def addJobDesc(conn, jobDesc, employerId):
    check_sql = ''' SELECT Listing_ID FROM Job_Listing WHERE Plaintext = ? '''
    cur = conn.cursor()
    cur.execute(check_sql, (jobDesc,))
    user = cur.fetchone()
    if user:
        return user[0]
    else:
        sql = ''' INSERT INTO Job_Listing(Plaintext, Employer_ID) VALUES(?, ?) '''
        cur.execute(sql, (jobDesc, employerId))
        conn.commit()
        return cur.lastrowid
    
def addEmployee(conn, name, plaintext):
    check_sql = ''' SELECT Employee_ID FROM Employee WHERE Name = ? '''
    cur = conn.cursor()
    cur.execute(check_sql, (name,))
    user = cur.fetchone()
    if user:
        return user[0]
    else:
        sql = ''' INSERT INTO Employee(Name, Plaintext) VALUES(?, ?) '''
        cur.execute(sql, (name, plaintext))
        conn.commit()
        return cur.lastrowid
#Row is a line from the csv file, first entry is the skill name/desc and the second is its category    
def addSkill(conn,row,id):
    query = '''INSERT INTO Skills_List VALUES(?,?,?)'''
    cur = conn.cursor()
    cur.execute(query, (id,row[0],row[1]))
    conn.commit()

def getAllSkills(conn):
    query = '''SELECT DISTINCT Category Skill FROM Skills_List'''
    cur = conn.cursor()
    cur.execute(query)
    results = cur.fetchall()
    skills = [row[0] for row in results]
    return skills

def getSkillsByCategories(conn, categories):
    placeholders = ','.join('?' * len(categories))
    query = f'''
    SELECT DISTINCT Skill_Name FROM Skills_List WHERE Category IN ({placeholders}) ORDER BY Skill_Name'''
    cur = conn.cursor()
    cur.execute(query, categories)
    skills = [row[0] for row in cur.fetchall()]
    return skills