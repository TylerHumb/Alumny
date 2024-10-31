import sqlite3
from sqlite3 import Error

# Create a connection to sqlite database
import os

def createConnection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(f"Connection to {db_file} database successful.")
        print(f"Database file path: {os.path.abspath(db_file)}")
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

# Row is a line from the csv file, first entry is the skill name/desc and the second is its category
def addSkill(conn, row, id):
    query = '''INSERT INTO Skills_List VALUES(?,?,?)'''
    cur = conn.cursor()
    cur.execute(query, (id, row[0], row[1]))
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

def getPlainText(conn, employer_id):
    query = '''SELECT Plaintext FROM Employee WHERE Employee_ID = ?'''
    cur = conn.cursor()
    cur.execute(query, (employer_id,))
    result = cur.fetchone()
    return result[0]

def addSkillToEmployee(conn, employee_id, skill, skill_id):
    """
    Insert the skill into the Employee_Skills table for the given employee.
    """
    try:
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO Employee_Skills (Employee_ID, Skill_Name, Skill_id)
            VALUES (?, ?, ?)
        ''', (employee_id, skill, skill_id))
        conn.commit()
        print(f"Skill '{skill}' added to employee ID {employee_id} in Employee_Skills.")
    except sqlite3.Error as e:
        print(f"Error adding skill '{skill}' for employee ID {employee_id} in Employee_Skills: {e}")

def addSkillToTemp(conn, skill, category):
    """
    Insert the skill into the Temp_Skills table.
    """
    try:
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO Temp_Skills (Skill_Name, Category)
            VALUES (?, ?)
        ''', (skill, category))
        conn.commit()
        print(f"Skill '{skill}' Category '{category}', added to Temp_Skills.")
    except sqlite3.Error as e:
        print(f"Error adding skill '{skill}' Category '{category}' in Temp_Skills: {e}")

def getSkillId(conn, skill):
    query = '''SELECT Skill_ID FROM Skills_List WHERE Skill_Name = ?'''
    cur = conn.cursor()
    cur.execute(query, (skill,))
    result = cur.fetchone()
    return result[0]

def insertSkill(conn, skill_name, category):
    query = '''INSERT INTO Skills_List (Skill_Name, Category) VALUES (?, ?)'''
    cur = conn.cursor()
    cur.execute(query, (skill_name, category))
    conn.commit()
    return cur.lastrowid

def addSkillToJob(conn, listing_id, skill, skill_id):
    """
    Insert the skill into the Job_Skills table for the given job listing.
    """
    try:
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO Job_Skills (Skill_Name, Listing_ID, Skill_id)
            VALUES (?, ?, ?)
        ''', (skill, listing_id, skill_id))
        conn.commit()
        print(f"Skill '{skill}' added to job listing ID {listing_id} in Job_Skills.")
    except sqlite3.Error as e:
        print(f"Error adding skill '{skill}' for listing ID {listing_id} in Job_Skills: {e}")

def getJobDesc(conn, listing_id):
    """
    Retrieve the job description (Plaintext) for a given Listing_ID.
    """
    try:
        query = '''SELECT Plaintext FROM Job_Listing WHERE Listing_ID = ?'''
        cur = conn.cursor()
        cur.execute(query, (listing_id,))
        result = cur.fetchone()
        if result:
            return result[0]  # Return the job description text
        else:
            return None  # If no job description is found
    except sqlite3.Error as e:
        print(f"Error retrieving job description for Listing_ID {listing_id}: {e}")
        return None

def checkSkillExistsForJob(conn, listing_id, skill_id):
    query = """
    SELECT 1 FROM Job_Skills 
    WHERE Listing_ID = ? AND skill_id = ?
    """
    cur = conn.cursor()
    cur.execute(query, (listing_id, skill_id))
    return cur.fetchone() is not None

def checkSkillExistsForEmployee(conn, employee_id, skill_id):
    query = """
    SELECT 1 FROM Employee_Skills 
    WHERE employee_id = ? AND skill_id = ?
    """
    cur = conn.cursor()
    cur.execute(query, (employee_id, skill_id))
    return cur.fetchone() is not None

#### Matching Functions
def match_employee_to_jobs(conn, employee_id):
    """
    Match employee skills to all job listings.
    - conn: The database connection.
    - employee_id: The employee ID to search for.
    """
    try:
        # Retrieve employee's skills
        cur = conn.cursor()
        cur.execute('SELECT Skill_Name FROM Employee_Skills WHERE Employee_ID = ?', (employee_id,))
        employee_skills = [row[0] for row in cur.fetchall()]

        if not employee_skills:
            print(f"No skills found for employee ID {employee_id}.")
            return []

        # Retrieve all job listings
        cur.execute('SELECT DISTINCT Listing_ID FROM Job_Skills')
        listings = [row[0] for row in cur.fetchall()]

        matched_listings = []

        for listing_id in listings:
            # Retrieve the job's skills
            cur.execute('SELECT Skill_Name FROM Job_Skills WHERE Listing_ID = ?', (listing_id,))
            listing_skills = [row[0] for row in cur.fetchall()]

            # Count the number of matching skills
            matching_skills = set(employee_skills).intersection(set(listing_skills))

            # Calculate the total number of possible matches (total skills the job listing has)
            total_possible_matches = len(listing_skills)

            # Add job listing to the matched list with the match count and the total possible matches
            matched_listings.append((listing_id, len(matching_skills), total_possible_matches, matching_skills))

        return matched_listings

    except sqlite3.Error as e:
        print(f"Error matching skills: {e}")
        return []

def match_job_to_employees(conn, listing_id):
    """
    Match job listing skills to all employees.
    - conn: The database connection.
    - listing_id: The job listing ID to search for.
    """
    try:
        # Retrieve job listing's skills
        cur = conn.cursor()
        cur.execute('SELECT Skill_Name FROM Job_Skills WHERE Listing_ID = ?', (listing_id,))
        job_skills = [row[0] for row in cur.fetchall()]

        if not job_skills:
            print(f"No skills found for listing ID {listing_id}.")
            return []

        # Retrieve all employees
        cur.execute('SELECT DISTINCT Employee_ID FROM Employee_Skills')
        employees = [row[0] for row in cur.fetchall()]

        matched_employees = []

        for employee_id in employees:
            # Retrieve the employee's skills
            cur.execute('SELECT Skill_Name FROM Employee_Skills WHERE Employee_ID = ?', (employee_id,))
            employee_skills = [row[0] for row in cur.fetchall()]

            # Count the number of matching skills
            matching_skills = set(job_skills).intersection(set(employee_skills))

            # Calculate the total number of possible matches (total skills the employee has)
            total_possible_matches = len(employee_skills)

            # Add employee to the matched list with the match count and the total possible matches
            matched_employees.append((employee_id, len(matching_skills), total_possible_matches, matching_skills))

        return matched_employees


    except sqlite3.Error as e:
        print(f"Error matching skills: {e}")
        return []
def list_tables(conn):
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cur.fetchall()
    print("\nTables in the database:")
    for table in tables:
        print(table[0])