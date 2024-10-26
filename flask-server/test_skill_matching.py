import userController

if __name__ == "__main__":
    # Create a connection to the database
    conn = userController.createConnection('Alumnyprod.db')

    if conn:
        # Ask the user whether they want to match an employee or a job listing
        choice = input("Enter '1' to match an employee to job listings, or '2' to match a job listing to employees: ")

        if choice == '1':
            # Match employee to job listings
            employee_id = int(input("Enter the employee ID: "))
            matched_jobs = userController.match_employee_to_jobs(conn, employee_id)

            # Sort by number of matching skills in descending order
            matched_jobs = sorted(matched_jobs, key=lambda x: x[1], reverse=True)

            if matched_jobs:
                print(f"\nJob listings matched for employee ID {employee_id} (sorted by most matches):\n")
                for listing_id, match_count, total_possible, matching_skills in matched_jobs:
                    print(f"Job Listing ID: {listing_id}")
                    print(f"Matching Skills: {match_count}/{total_possible}")
                    if matching_skills:
                        print(f"Skills: {', '.join(matching_skills)}\n")
                    else:
                        print("No matching skills.\n")
            else:
                print(f"No job listings found for employee ID {employee_id}.")

        elif choice == '2':
            # Match job listing to employees
            listing_id = int(input("Enter the job listing ID: "))
            matched_employees = userController.match_job_to_employees(conn, listing_id)

            # Sort by number of matching skills in descending order
            matched_employees = sorted(matched_employees, key=lambda x: x[1], reverse=True)

            if matched_employees:
                print(f"\nEmployees matched for job listing ID {listing_id} (sorted by most matches):\n")
                for employee_id, match_count, total_possible, matching_skills in matched_employees:
                    print(f"Employee ID: {employee_id}")
                    print(f"Matching Skills: {match_count}/{total_possible}")
                    if matching_skills:
                        print(f"Skills: {', '.join(matching_skills)}\n")
                    else:
                        print("No matching skills.\n")
            else:
                print(f"No employees found for job listing ID {listing_id}.")

        else:
            print("Invalid choice. Please enter '1' or '2'.")

        # Close the database connection
        userController.closeConnection(conn)
