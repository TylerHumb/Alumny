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

    Format your response as a simple list, with each skill on a new line, like this:
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

conn = userController.createConnection('Alumny.db')
categoryList = userController.getAllSkills(conn)

sampleText = "Name: John Doe Plaintext: IT Grad Student Transforming Technology Greater Sydney Area Summary John is an aspiring IT professional currently pursuing his master's in Information Technology at the University of Sydney. He has over 2 years of experience in various internships and part-time roles. John has worked with start-ups and small businesses to implement technology solutions that streamline operations and enhance user experiences. He is passionate about software development and cybersecurity, with a strong foundation in programming languages such as Python, Java, and C++. His experience includes working on projects that integrate AI for data analysis, providing actionable insights for business growth. John aims to further specialize in cloud computing and machine learning, applying his knowledge to real-world challenges. Experience ABC Tech SolutionsSoftware Development Intern July 2023 - Present (1 year 2 months) Sydney, Australia Tech Start-UpPart-time IT Support Specialist January 2022 - June 2023 (1 year 6 months) Sydney, Australia Certifications CompTIA Security+ AWS Certified Solutions Architect Microsoft Certified: Azure Fundamentals Skills Software Development Cybersecurity Cloud Computing."

foundSkillsCategories = findSkillCategories(categoryList, sampleText)
print("Skills found in the text:")
for skill in foundSkillsCategories:
    print(f"- {skill}")