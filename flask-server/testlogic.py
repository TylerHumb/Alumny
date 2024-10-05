import sqlite3
from sqlite3 import Error
from flask import jsonify,abort
db_file = 'Alumnyprod'
def createConnection():
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


def loginEmployee(id):
    conn = createConnection()
    conn.row_factory = sqlite3.Row  # Make cursor return rows as dictionaries
    cur = conn.cursor()
    cur.execute("SELECT * FROM Employee WHERE Employee_ID = ?",(id,))
    user = cur.fetchone()
    closeConnection(conn)
    if user is None:
        return abort(404,description = 'User not flound')
    return jsonify({
            'id': id,
            'Name': user['Name'],   
            'resume': user['Plaintext']  
        })

def getSkillsEmployee(id):
    conn = createConnection()
    conn.row_factory = sqlite3.Row  # Make cursor return rows as dictionaries
    cur = conn.cursor()
    cur.execute("SELECT * FROM Employee_skills WHERE Employee_ID = ?",(id,))
    skills = cur.fetchall()
    closeConnection(conn)
    if len(skills) == 0:
        return abort(404,description = 'No skills found')
    skilllist = []
    for skill in skills:
        skilldata = {
            'Skill_Name':skill['Skill_Name'],
            'Skill_ID':skill['Skill_ID']
        }
        skilllist.append(skilldata)
    return skilllist

def addSkillToEmployee(employee_id, skill):
    conn = createConnection()
    try:
        cur = conn.cursor()
        cur.execute('''INSERT INTO Employee_Skills (Employee_ID, Skill_Name)VALUES (?, ?)''', (employee_id, skill))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error as e:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')
    
def deleteSkillEmployee(employee_id,skill):
    conn = createConnection()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM Employee_Skills WHERE Skill_Name = ? AND Employee_ID = ?",(skill,employee_id))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error as e:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')