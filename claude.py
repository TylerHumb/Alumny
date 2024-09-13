import anthropic
import os
from dotenv import load_dotenv
import userController

load_dotenv()
api_key = os.getenv('api_key_anthropic')

client = anthropic.Anthropic(api_key=api_key)

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
        temperature=0.2,
        messages=[
            {"role": "user", "content": prompt}
        ]
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
    2. For implied skills not in the list, use the format "Implied: [Skill], [Category]" where [Category] must be from the provided category list.

    Do not include any introductory text or explanations. The response should start directly with the first identified skill or implied skill. For example:
    Python
    JavaScript
    Database management
    Implied: Java, Software development and programming languages
    Implied: Agile methodology, Computer-aided software engineering tools"""

    # State of the art claude model as of 13/09/2024, $3 per 1 million input tokens, $15 per 1 million output tokens
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=4000,
        temperature=0.2,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    responseContent = message.content[0].text
    skillsFound = [line.strip() for line in responseContent.split('\n') if line.strip()]

    return skillsFound


if __name__ == "__main__":
    conn = userController.createConnection('Alumny.db')
    categoryList = userController.getAllSkills(conn)
    sampleText = userController.getPlainText(conn, 1)

    foundSkillsCategories = findSkillCategories(categoryList, sampleText)
    print("Skills categories found in the text:")
    for skill in foundSkillsCategories:
        print(f"- {skill}")
    list = ["Software development and programming languages", "Network security and virtual private network VPN software"]
    skillsList = userController.getSkillsByCategories(conn, list)

    foundSkills = findSkills(skillsList, categoryList, sampleText)
    print("Skills found in the text:")
    for skill in foundSkills:
        print(f"- {skill}")
    print(skillsList)
    
    userController.closeConnection(conn)