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
        return deleteAllEmployee(employee_id)
    except:
        return abort(404,description = 'Error occured during execution')
#EMPLOYER SIDE STARTS HERE --------------------------------------------------------------------
def loginBusiness(business_id):
    try:
        conn = createConnection()
        conn.row_factory = sqlite3.Row  # Make cursor return rows as dictionaries
        cur = conn.cursor()
        cur.execute("SELECT * FROM Employer WHERE Employer_ID = ?",(business_id,))
        user = cur.fetchone()
        closeConnection(conn)
        if user is None:
            return abort(404,description = 'Employer not flound')
        return jsonify({
                'id': business_id,
                'Name': user['Name'],   
            })
    except:
        return abort(404,description = 'Error fetching employer')
    
def getListings(business_id):
    try:
        conn = createConnection()
        conn.row_factory = sqlite3.Row  # Make cursor return rows as dictionaries
        cur = conn.cursor()
        cur.execute("SELECT * FROM job_listing WHERE Employer_ID = ?",(business_id,))
        listings = cur.fetchall()
        closeConnection(conn)
        if len(listings) == 0:
            return [] #early termination if no skills
        listingList = []
        for listing in listings:
            listingdata = {
                'Listing_ID':listing['Listing_ID'],
                'Plaintext':listing['Plaintext']
            }
            listingList.append(listingdata)
        return listingList
    except:
        return abort(404,description = 'Error fetching job listings')

def getSkillsBusiness(listing_id):
    try:
        conn = createConnection()
        conn.row_factory = sqlite3.Row  # Make cursor return rows as dictionaries
        cur = conn.cursor()
        cur.execute("SELECT * FROM Job_Skills WHERE Listing_ID = ?",(listing_id,))
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
    except:
        return abort(404,description = 'Error fetching listing skills')
    
def createBusiness(name):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("INSERT INTO Employer(Name) VALUES(?)", (name,))
        conn.commit()
        return jsonify({'userid':cur.lastrowid})
    except:
        return abort(404,description = 'Error occured during execution')
    
def addSkillBusiness(listing_id,skill):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute('''INSERT INTO job_skills (listing_id, Skill_Name)VALUES (?, ?)''', (listing_id, skill))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error as e:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')


    
def deleteSkillBusiness(listing_id,skill):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("DELETE FROM job_skills WHERE LOWER(Skill_Name) = LOWER(?) AND listing_id = ?", (skill, listing_id))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error as e:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')

def deleteAllBusiness(listing_id):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("DELETE FROM job_skills WHERE listing_id = ?", (listing_id,))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')

def deleteListing(listing_id):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("DELETE FROM Job_listing WHERE listing_id = ?", (listing_id,))
        conn.commit()
        closeConnection(conn)
        return jsonify({'message':"OK"}),200
    except sqlite3.Error:
        closeConnection(conn)
        return abort(404,description = 'Error occured during execution')

def createListing(business_id):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("INSERT INTO Job_Listing(Employer_ID) VALUES(?)", (business_id,))
        conn.commit()
        return jsonify({'listing_id':cur.lastrowid})
    except:
        return abort(404,description = 'Error occured during execution')

def addDescription(listing_id,text):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("UPDATE job_listing SET Plaintext = ? WHERE listing_id = ?;", (text,listing_id))
        conn.commit()
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')


def deleteDescription(listing_id):
    try:
        conn = createConnection()
        cur = conn.cursor()
        cur.execute("UPDATE job_listing SET Plaintext = Null WHERE listing_id = ?;", (listing_id,))
        conn.commit()
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')