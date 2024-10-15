import os
import re
import csv
import userController

def loadJobTestData(conn, folderPath):
    folderPathJobs = os.path.join(folderPath, 'jobs')
    for root, dirs, files in os.walk(folderPathJobs):
        for file in files:
            if file.endswith(".txt"):
                filePath = os.path.join(root, file)
                with open(filePath, "r", encoding='utf-8') as f:
                    content = f.read()
                    company = re.search(r'^Company:\s*(.*)', content, re.MULTILINE)
                    # Test data without company names are not included
                    if company:
                        id = userController.addEmployer(conn, company.group(1))
                        desc = re.search(r'^Description:\s*(.*)', content, re.MULTILINE | re.DOTALL)
                        userController.addJobDesc(conn, desc.group(1), id)
    folderPathEmployees = os.path.join(folderPath, 'employees')
    for root, dirs, files in os.walk(folderPathEmployees):
        for file in files:
            if file.endswith(".txt"):
                filePath = os.path.join(root, file)
                with open(filePath, "r", encoding='utf-8') as f:
                    content = f.read()
                    name = re.search(r'^Name:\s*(.*)', content, re.MULTILINE)
                    if name:
                        plainText = re.search(r'^Plaintext:\s*(.*)', content, re.MULTILINE | re.DOTALL)
                        id = userController.addEmployee(conn, name.group(1), plainText.group(1))

def loadSkillData(conn,folderPath):
    skillspath = folderPath + '/Skills.csv'
    SkillsList = open(skillspath, 'r')
    csv_reader = csv.reader(SkillsList,delimiter=',')
    skill_id = 1
    for row in csv_reader:
        userController.addSkill(conn,row,skill_id)
        skill_id += 1


#Just to load the data and for testing purposes can be deleted later
if __name__ == '__main__':
    folderPath = 'testData'
    conn = userController.createConnection('Alumnyprod.db')
    loadJobTestData(conn, folderPath)
    loadSkillData(conn,folderPath)
    userController.closeConnection(conn)
