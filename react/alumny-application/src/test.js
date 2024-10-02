import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Test() {
    const [userId, setUserId] = useState(""); // State to hold user ID input
    const [user, setUser] = useState(null);    // State to hold fetched user data
    const [error,setError] = useState(null)
    const [skills,setSkills] = useState(null)
    const [skilltoadd,setSkillToAdd] = useState("")
    const [skilltodel,setSkillToDel] = useState("")

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setUser(null); //Set user to null
        setError(null); // set error to null
        setSkills(null);// set skills to null
        try {
            // Make API call to the Flask backend
            const response = await fetch(`/loginemp/${userId}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error("User not found"); // Handle errors
            }
            const userdata = await response.json(); // Parse the response JSON
            setUser(userdata); // Set user data in state
            loadskills()
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    const loadskills = async () =>{
        try{
            //once user is set, retrieve their skills
            const skillslist = await fetch(`/skillsemp/${userId}`);
            if (!skillslist.ok){
                return; // terminate early if no skills
            }
            const skillsdata = await skillslist.json(); // Parse the response JSON
            setSkills(skillsdata);
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    }
    const addSkill = async (e) => {
        try {
            e.preventDefault(); //prevent empty skill being added
            const response = await fetch(`/addskillemp/${userId}/${skilltoadd}`)
            if(!response.ok){
                throw new Error("Skill failed to add")
            }
            //reload skills if new skill was successfully added
            loadskills()
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }
    const deleteskill = async (e) => {
        try {
            e.preventDefault(); //prevent empty skill being added
            const response = await fetch(`/deleteSkillemp/${userId}/${skilltodel}`)
            if(!response.ok){
                throw new Error("Skill failed to delete")
            }
            //reload skills if new skill was successfully deleted
            loadskills()
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }
    return (
        <div>
            <p>Welcome {user ? user.Name : 'guest'}</p> {/* Display user name if found */}
            
            <form onSubmit={handleSubmit}>
                <label>Sign in, enter ID:</label>
                <input 
                    type="text" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
    
            <br />
            
            {error && <p>{error}</p>} {/* Display error message if any */}
            
            {user && ( // Display more information if the user is signed in
            <div>
                    <p>Resume:<br />{user.resume || 'No resume available'}</p>
                    <br />
                    {skills === null || skills.length === 0 ? (
                        <p>No skills present</p>
                    ) : (
                        <ul>
                            {skills.map(skill => (
                                <li key={skill.Skill_Name}>{skill.Skill_Name}</li>
                            ))}
                        </ul>
                    )}
                <form onSubmit={addSkill}>
                    <label>Manually add new skill to profile?</label> <br />
                    <input type='text' value={skilltoadd} onChange={(e) => setSkillToAdd(e.target.value)} />
                    <button type='submit'>add skill</button>
                </form>
                <form onSubmit={deleteskill}>
                    <label>remove skill from profile</label> <br />
                    <input type='text' value={skilltodel} onChange={(e) => setSkillToDel(e.target.value)} />
                    <button type='submit'>delete skill</button>
                </form>
            </div>
            )}
        </div>
    )};
export default Test;