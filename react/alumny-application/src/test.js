import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Test() {
    const [userId, setUserId] = useState(""); // State to hold user ID input
    const [user, setUser] = useState(null);    // State to hold fetched user data
    const [error,setError] = useState(null);
    const [skills,setSkills] = useState(null);
    const [skilltoadd,setSkillToAdd] = useState("");
    const [skilltodel,setSkillToDel] = useState("");
    const [name,setName] = useState("");

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
            loadskills();
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    // for refreshing resume or skills
    const refreshuser = async (e) =>{
        setUser(null); //Set user to null
        try {
            const response = await fetch(`/loginemp/${userId}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error("error refreshing resume"); 
            }
            const userdata = await response.json(); // Parse the response JSON
            setUser(userdata); // Set user data in state
            loadskills();
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    const loadskills = async () =>{
        setError(null); // set error to null
        try{
            //once user is set, retrieve their skills
            const skillslist = await fetch(`/skillsemp/${userId}`);
            if (!skillslist.ok){
                throw new Error("skills not found"); // Handle errors
            }
            const skillsdata = await skillslist.json(); // Parse the response JSON
            setSkills(skillsdata);
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    };
    const addSkill = async (e) => {
        setError(null); // set error to null
        try {
            e.preventDefault(); //prevent empty skill being added
            const response = await fetch(`/addskillemp/${userId}/${skilltoadd}`);
            if(!response.ok){
                throw new Error("Skill failed to add")
            }
            //reload skills if new skill was successfully added
            loadskills();
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    const deleteskill = async (e) => {
        setError(null); // set error to null
        try {
            e.preventDefault(); //prevent empty skill being added
            const response = await fetch(`/deleteskillemp/${userId}/${skilltodel}`)
            if(!response.ok){
                throw new Error("Skill failed to delete")
            }
            //reload skills if new skill was successfully deleted
            loadskills();
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    const extractskills = async () => {
        setError(null); // set error to null
        try{
            const response = await fetch(`/extractskillsemp/${userId}`)
            if (!response.ok){
                throw new Error("Skill extraction failed")
            }
            //reload skills if skills were successfully extracted
            loadskills();
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    };
    const deleteskills = async () => {
        setError(null); // set error to null
        try{
            const response = await fetch(`/deleteallemp/${userId}`)
            if (!response.ok){
                throw new Error("error during skill deletion")
            }
            //reload skills if skills were successfully deleted
            loadskills();
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    };
    const createAccount = async (e) =>{
        setError(null); // set error to null
        try{
            e.preventDefault();
            const response = await fetch(`/createemp/${name}`);
            if (!response.ok){
                throw new Error("error during account creation");
            }
            const parseduserid = await response.json();
            setUserId(parseduserid.userid);
            setError("Account creation successfull! your userid is: "+ parseInt(userId));
            setName(null);// clear name field
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    };
    const uploadresume = async (e) =>{
        setError(null); // set error to null
        try{
            e.preventDefault();
            const response = await fetch(`/resume/${userId}/${name}`);

            if (!response.ok){
                throw new Error("error during resume upload");
            }
            setName(null)// clear name field
            refreshuser();
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    };
    const removeResume = async () =>{
        setError(null); // set error to null
        try{
            const response = await fetch(`/removeresume/${userId}`);

            if (!response.ok){
                throw new Error("error during resume deletion");
            }
            refreshuser();
        }catch(err){
            setError(err.message);
            console.log(err);
        }

    };
    const deleteaccount = async (e) => {
        setError(null); // set error to null
        try{
            console.log(userId)
            const response = await fetch(`/deleteemp/${userId}`);

            if (!response.ok){
                throw new Error("error during account deletion");
            }
            setUserId(null);
            setUser(null);
        }catch(err){
            setError(err.message);
            console.log(err);
        }
        
    };
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
            <br/>
            {user === null &&( // if user isnt set
                <div>
                    <form onSubmit={createAccount}> 
                        <label>Create new account? enter name below</label> <br/>
                        <input //create a form to create account
                            type="text"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        ></input>
                        <br/>
                        <button type='submit'>Create account</button>
                    </form>    
                </div>
            )}
            
            
            <br />
            
            {error && <p style={{color: 'red' }}>{error}</p>} {/* Display error message if any */}
            
            {user && ( // Display more information if the user is signed in
            <div>
                    <p>Resume:<br />{user.resume || 'No resume available'}</p>
                    {!user.resume ? (
                        <div>
                            <p>Submit a resume to file?</p>
                            <form onSubmit={uploadresume}>
                                <input type='textarea'
                                    value={name} //resuse name to save variables, both cant be changed at the same time anyway
                                    onChange={(e) => setName(e.target.value)} 
                                ></input> <br/>
                                <button type='submit'>Submit resume</button>
                            </form>
                            
                        </div>
                    ) : ( // if there is a resume on file, give option to delete it
                        <button onClick={removeResume}>Clear resume?</button>
                    )}
                    <br />
                    {skills === null || skills.length === 0 ? (
                        <div>
                            <p>No skills present</p>
                            {user.resume &&(
                            <button onClick={extractskills}>extract skills from resume?</button>
                            )}
                        </div>
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
                <br/>
                <button onClick={deleteskills}>Delete all skills from profile?</button>
                <br/>
                <button onClick={deleteaccount}>Delete account </button>
            </div>
            )}
        </div>
    )};
export default Test;