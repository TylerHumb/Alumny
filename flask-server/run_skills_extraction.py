# run_skills.py

from claude import SkillExtractor  # Importing SkillExtractor from claude.py

def main():
    # Create an instance of SkillExtractor
    skills = SkillExtractor()

    # Extract employee skills for a given employee_id (example: employee_id = 3)
    # print("Extracting skills for Employee ID 3:")
    # skills.extractEmployeeSkills(3)
    
    # Extract employer skills for a given employer_id (example: employer_id = 4)
    print("Extracting skills for Employer ID 4:")
    skills.extractEmployerSkills(10)
    
    # Close the connection to the database when done
    skills.close()

if __name__ == "__main__":
    main()
