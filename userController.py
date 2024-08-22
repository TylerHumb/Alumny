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
    
def addJobDesc(conn, jobDesc):
    check_sql = ''' SELECT Listing_ID FROM Job_Listing WHERE Plaintext = ? '''
    cur = conn.cursor()
    cur.execute(check_sql, (jobDesc,))
    user = cur.fetchone()
    if user:
        print("Job already exists")
        return user[0]
    else:
        print("Job does not exist")
        sql = ''' INSERT INTO Job_Listing(Plaintext) VALUES(?) '''
        cur.execute(sql, (jobDesc,))
        conn.commit()
        return cur.lastrowid
