import anthropic
import os
from dotenv import load_dotenv
import userController
import sqlite3

def cachedFindSkillCategories(categoryList, text):
    prompt = f""" Given the following list of skill categories:
    {', '.join(categoryList)}

    And the following text:
    "{text}"

    Please identify which skills categories from the provided list are mentioned or implied in the text. Only return skills categories that are in the provided list.

    Format your response as a simple list, with each skill category on a new line. Do not include any introductory text or explanations. The response should start directly with the first category. For example:
    Skill category 1
    Skill category 2
    Skill category 3 """

    # State of the art claude model as of 13/09/2024, $3 per 1 million input tokens, $15 per 1 million output tokens
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=4000,
        temperature=0.15,
        messages=[{
            "role": "user", 
            "content": [
                {
                    "type": "text", 
                    "text": "<student profile/job description>" + text + "<student profile/job description>",
                    "cache_control": {"type": "ephemeral"}
                },
                {
                    "type": "text", 
                    "text": prompt
                }
            ]
        }],
        extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"}

    )

    responseContent = message.content[0].text

    categoriesFound = [line.strip() for line in responseContent.split('\n') if line.strip()]
    return categoriesFound

def cachedFindSkills(skillList, categoryList, text):    
    prompt = f"""Given the following list of skills:
    {', '.join(skillList)}
    
    And the following list of skill categories:
    {', '.join(categoryList)}

    And the cached text:

    Please identify which skills from the provided list are mentioned or implied in the text. Only return skills that are in the provided list.

    Additionally, identify any skills that are implied but not in the provided list. For these implied skills, specify the most appropriate category from the provided category list.

    Format your response as follows:
    1. List the skills from the provided list that are mentioned or implied, one per line.
    2. For implied skills not in the list, use the format "Implied: 
    [Skill], [Category]" where [Category] must be from the provided category list.

    Do not include any introductory text or explanations. The response should start directly with the first identified skill or implied skill. For example:
    identified skill:
    Python
    JavaScript
    Database management
    Implied: 
    Java, Software development and programming languages
    Agile methodology, Computer-aided software engineering tools.
    """

    # State of the art claude model as of 13/09/2024, $3 per 1 million input tokens, $15 per 1 million output tokens
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=4000,
        temperature=0.15,
        messages=[{
            "role": "user", 
            "content": [
                {
                    "type": "text", 
                    "text": "<student profile/job description>" + text + "<student profile/job description>",
                    "cache_control": {"type": "ephemeral"}
                },
                {
                    "type": "text", 
                    "text": prompt
                }
            ]
        }],
        extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"}
    )

    responseContent = message.content[0].text

    skillsFound = [line.strip() for line in responseContent.split('\n') if line.strip()]
    return skillsFound

def findSkillCategories(categoryList, text):
    prompt = f""" Given the following list of skill categories:
    {', '.join(categoryList)}

    And the following text:
    "{text}"

    Please identify which skills categories from the provided list are mentioned or implied in the text. Only return skills categories that are in the provided list.

    Format your response as a simple list, with each skill category on a new line. Do not include any introductory text or explanations. The response should start directly with the first category. For example:
    Skill category 1
    Skill category 2
    Skill category 3 """

    # State of the art claude model as of 13/09/2024, $3 per 1 million input tokens, $15 per 1 million output tokens
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=4000,
        temperature=0.15,
        messages=[{"role": "user", "content": prompt}]
    )

    responseContent = message.content[0].text

    categoriesFound = [line.strip() for line in responseContent.split('\n') if line.strip()]
    return categoriesFound

def findSkills(skillList, categoryList, text):    
    prompt = f"""Given the following list of skills:
    {', '.join(skillList)}
    
    And the following list of skill categories:
    {', '.join(categoryList)}

    And the following text:
    "{text}"

    Please identify which skills from the provided list are mentioned or implied in the text. Only return skills that are in the provided list.

    Additionally, identify any skills that are implied but not in the provided list. For these implied skills, specify the most appropriate category from the provided category list.

    Format your response as follows:
    1. List the skills from the provided list that are mentioned or implied, one per line.
    2. For implied skills not in the list, use the format "Implied: 
    [Skill], [Category]" where [Category] must be from the provided category list.

    Do not include any introductory text or explanations. The response should start directly with the first identified skill or implied skill. For example:
    identified skill:
    Python
    JavaScript
    Database management
    Implied: 
    Java, Software development and programming languages
    Agile methodology, Computer-aided software engineering tools"""

    # State of the art claude model as of 13/09/2024, $3 per 1 million input tokens, $15 per 1 million output tokens
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=4000,
        temperature=0.15,
        messages=[{"role": "user", "content": prompt}]
    )

    responseContent = message.content[0].text

    skillsFound = [line.strip() for line in responseContent.split('\n') if line.strip()]
    return skillsFound

if __name__ == "__main__":
    load_dotenv()
    api_key = os.getenv('api_key_anthropic')
    client = anthropic.Anthropic(api_key=api_key)

    conn = userController.createConnection('Alumny.db')

    employee_id = int(input("Enter the employee ID: "))

    categoryList = userController.getAllSkills(conn)

    sampleText = userController.getPlainText(conn, employee_id)

    foundSkillsCategories = findSkillCategories(categoryList, sampleText)
    print("Skills categories found in the text:")
    for skill in foundSkillsCategories:
        print(f"- {skill}")
    
    skillsList = userController.getSkillsByCategories(conn, foundSkillsCategories)

    foundSkills = findSkills(skillsList, categoryList, sampleText)
    print("Skills found in the text:")
    for skill in foundSkills:
        print(f"- {skill}")

    # Insert skills into the appropriate tables
    for skill in foundSkills:
        if skill in skillsList:
            skill_id = userController.getSkillId(conn, skill)
            userController.addSkillToEmployee(conn, employee_id, skill, skill_id)  # Insert into Employee_Skills
        else:
            if ',' in skill:
                skill, category = skill.split(',')
                skill = skill.strip()
                category = category.strip()
                skill_id = userController.insertSkill(conn, skill, category)
                userController.addSkillToTemp(conn, employee_id, skill, category, id)  # Insert into Temp_Skills
                userController.addSkillToEmployee(conn, employee_id, skill, skill_id)  # Insert into Employee_Skills

    userController.closeConnection(conn)
