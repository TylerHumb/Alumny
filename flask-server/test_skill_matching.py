import userController

# Main script for testing the matching functionality
if __name__ == "__main__":
    # Use the connection function from userController.py
    conn = userController.createConnection('Alumny.db')

    if conn:
        # Ask the user for the employee ID to test matching
        employee_id = int(input("Enter the employee ID: "))

        # Call the match_employee_to_employer function from userController.py
        matched_employers = userController.match_employee_to_employer(conn, employee_id, min_matches=5)

        # Display the results
        if matched_employers:
            print(f"Employers with at least 5 matching skills for employee ID {employee_id}:")
            for employer_id, match_count, matching_skills in matched_employers:
                print(f"Employer ID: {employer_id}, Matching Skills: {match_count}")
                print(f"Skills: {', '.join(matching_skills)}\n")
        else:
            print(f"No employers found with at least 5 matching skills for employee ID {employee_id}.")

        # Use the closeConnection function from userController.py
        userController.closeConnection(conn)
