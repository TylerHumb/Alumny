import os
import re
import userController

def loadJobTestData(conn, folderPath):
    for root, dirs, files in os.walk(folderPath):
        for file in files:
            if file.endswith(".txt"):
                filePath = os.path.join(root, file)
                with open(filePath, "r", encoding='utf-8') as f:
                    content = f.read()
                    company = re.search(r'^Company:\s*(.*)', content, re.MULTILINE)
                    # Test data without company names are not included
                    if company:
                        id = userController.addEmployer(conn, company.group(1))
                        print(company.group(1), id)
                        desc = re.search(r'^Description:\s*(.*)', content, re.MULTILINE | re.DOTALL)
                        if desc:
                            print(desc.group(1))
                        userController.addJobDesc(conn, desc.group(1))




#Just to load the data and for testing purposes can be deleted later
if __name__ == '__main__':
    folderPath = 'testData/jobs'
    conn = userController.createConnection('Alumny.db')
    loadJobTestData(conn, folderPath)