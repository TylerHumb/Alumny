import userController

if __name__ == "__main__":
    # Create a connection to the database
    conn = userController.createConnection('Alumny.db')

    if conn:
        # Ask the user whether they want to match an employee or an employer
        choice = input("Enter '1' to match an employee to employers, or '2' to match an employer to employees: ")

        if choice == '1':
            # Match employee to employers
            employee_id = int(input("Enter the employee ID: "))
            matched_employers = userController.match_employee_to_employers(conn, employee_id)

            # Sort by number of matching skills in descending order
            matched_employers = sorted(matched_employers, key=lambda x: x[1], reverse=True)

            if matched_employers:
                print(f"\nEmployers matched for employee ID {employee_id} (sorted by most matches):\n")
                for employer_id, match_count, total_possible, matching_skills in matched_employers:
                    print(f"Employer ID: {employer_id}")
                    print(f"Matching Skills: {match_count}/{total_possible}")
                    if matching_skills:
                        print(f"Skills: {', '.join(matching_skills)}\n")
                    else:
                        print("No matching skills.\n")
            else:
                print(f"No employers found for employee ID {employee_id}.")

        elif choice == '2':
            # Match employer to employees
            employer_id = int(input("Enter the employer ID: "))
            matched_employees = userController.match_employer_to_employees(conn, employer_id)

            # Sort by number of matching skills in descending order
            matched_employees = sorted(matched_employees, key=lambda x: x[1], reverse=True)

            if matched_employees:
                print(f"\nEmployees matched for employer ID {employer_id} (sorted by most matches):\n")
                for employee_id, match_count, total_possible, matching_skills in matched_employees:
                    print(f"Employee ID: {employee_id}")
                    print(f"Matching Skills: {match_count}/{total_possible}")
                    if matching_skills:
                        print(f"Skills: {', '.join(matching_skills)}\n")
                    else:
                        print("No matching skills.\n")
            else:
                print(f"No employees found for employer ID {employer_id}.")

        else:
            print("Invalid choice. Please enter '1' or '2'.")

        # Close the database connection
        userController.closeConnection(conn)
