import sqlite3
from sqlite3 import Error
from flask import jsonify,abort
db_file = 'Alumnyprod.db'
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
        return [] #early termination if no skills
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
        cur.execute("DELETE FROM Employee_Skills WHERE LOWER(Skill_Name) = LOWER(?) AND Employee_ID = ?", (skill, employee_id))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error as e:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')

def deleteAllEmployee(employee_id):
    conn = createConnection()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM Employee_Skills WHERE Employee_ID = ?", (employee_id,))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')
    
def createEmployee(name):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("INSERT INTO Employee(Name) VALUES(?)", (name,))
        conn.commit()
        return jsonify({'userid':cur.lastrowid})
    except:
        return abort(404,description = 'Error occured during execution')
    
def setresume(employee_id,resume):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("UPDATE Employee SET Plaintext = ? WHERE Employee_ID = ?;", (resume,employee_id))
        conn.commit()
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')

def clearresume(employee_id):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("UPDATE Employee SET Plaintext = Null WHERE Employee_ID = ?;", (employee_id,))
        conn.commit()
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')
    
def deleteEmployee(employee_id):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("DELETE FROM Employee WHERE Employee_ID = ?;", (employee_id,))
        conn.commit()
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')