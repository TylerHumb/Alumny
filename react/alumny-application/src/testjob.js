import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TestJob() {
    const [userId, setUserId] = useState(""); // State to hold user ID input
    const [user, setUser] = useState(null);    // State to hold fetched user data
    const [jobListings,setListings] = useState(null)
    const [selectedListing,setSelected] = useState(null)
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
        setSelected(null); //set selected listing to null
        try {
            // Make API call to the Flask backend
            const response = await fetch(`/loginbus/${userId}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error("User not found"); // Handle errors
            }
            const userdata = await response.json(); // Parse the response JSON
            setUser(userdata); // Set user data in state
            fetchListings();
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    const fetchListings = async () => {
        setError(null); // set error to null
        try {
            const response = await fetch(`/listings/${userId}`);
            // Check if the response is successful
            if (!response.ok) {
                throw new Error("Listings not found"); // Handle errors
            }
            const listings = await response.json(); // Parse the response JSON
            setListings(listings); // Set user data in state
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    const selectListing = async (listing) => {
        setError(null);
        try{
            setSelected(listing);
            loadskills();
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    const loadskills = async () => {
        setError(null);
        try{
            const response = await fetch(`/skillsbus/${selectedListing.Listing_ID}`)
            if (!response.ok){
                throw new Error("error retrieving listing skills")
            }
            const skills = await response.json(); // Parse the response JSON
            setSkills(skills)
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }
    const createAccount = async (e) =>{
        setError(null); // set error to null
        try{
            e.preventDefault();
            const response = await fetch(`/createbus/${name}`);
            if (!response.ok){
                throw new Error("error during account creation");
            }
            const parseduserid = await response.json();
            setUserId(parseduserid.userid);
            setError("Account creation successfull! your business ID is: "+ parseInt(userId));
            setName(null);// clear name field
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    };

    const addSkill = async (e) => {
        setError(null); // set error to null
        try {
            e.preventDefault(); //prevent empty skill being added
            const response = await fetch(`/addskillbus/${selectedListing.Listing_ID}/${skilltoadd}`);
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
            const response = await fetch(`/deleteskillbus/${selectedListing.Listing_ID}/${skilltodel}`)
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
            const response = await fetch(`/extractskillsbus/${selectedListing.Listing_ID}`)
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
            const response = await fetch(`/deleteallbus/${selectedListing.Listing_ID}`)
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
    const deletelisting = async () => {
        setError(null); // set error to null
        try{
            const response = await fetch(`/deletelisting/${selectedListing.Listing_ID}`)
            if (!response.ok){
                throw new Error("error during skill deletion")
            }
            //set selected listing to null if deletion successful
            setSelected(null)
            //refectch listing list
            fetchListings();
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    }
    const createlisting = async () =>{
        setError(null); // set error to null
        try{
            const response = await fetch(`/createlisting/${userId}`)
            if (!response.ok){
                throw new Error("error during listing deletion")
            }
            const parseduserid = await response.json();
            setUserId(parseduserid.userid);
            setError("Listing creation successfull! your new listing ID is: "+ parseInt(userId));
            fetchListings();
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    }
    const addplaintext = async () => {
        setError(null); // set error to null
        try{
            const response = await fetch(`/adddescription/${selectedListing.Listing_ID}/${name}`);

            if (!response.ok){
                throw new Error("error during resume deletion");
            }
        }catch(err){
            setError(err.message);
            console.log(err);
        }
    }
    const clearplaintext = async () =>{
        setError(null); // set error to null
        try{
            const response = await fetch(`/deletedescription/${selectedListing.Listing_ID}`);

            if (!response.ok){
                throw new Error("error during resume deletion");
            }
        }catch(err){
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
            <br/>
            {user === null &&( // if user isnt set
                <div>
                    <form onSubmit={createAccount}> 
                        <label>Create new company account? enter name below</label> <br/>
                        <input //create a form to create account
                            type="text"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        ></input>
                        <button type='submit'>Create account</button>
                    </form>    
                </div>
            )}
            
            
            <br />
            
            {error && <p style={{color: 'red' }}>{error}</p>} {/* Display error message if any */}
            
            {user &&(
                <div>
                {jobListings === null ||jobListings.length === 0 ?(
                    <p>No Jobs on file</p>
                ):(
                    <ul>
                    {jobListings.map(listing =>(
                        <li key={listing.Listing_ID} onClick={() => selectListing(listing)}>
                            Job Posting ID = {listing.Listing_ID}
                        </li>
                    ))}
                    </ul>
                )}
                <button onClick={createlisting}>Create new listing</button>
                {selectedListing === null ?(
                    <p>Click on a listing above to select it and show its details here!</p>
                ) : (
                    <div>
                        <br/>
                        <p>Selected listing</p>
                        <p>ID: {selectedListing.Listing_ID}</p>
                        <p>Job Description: <br/> {selectedListing.Plaintext || 'No Description provided'} </p>
                        <br/>
                        {selectedListing.Plaintext === null ?(
                            <form onSubmit={addplaintext}>
                                <input type='textarea' value={name}onChange={(e) => setName(e.target.value)} />
                                <button type="submit">submit job Description</button>
                            </form>
                        ) : (
                            <button onClick={clearplaintext}>Clear listing Description?</button>
                        )}
                        {skills === null || skills.length === 0 ?(
                            <div>
                                <p>Selected job has no skills attributed</p>
                                {selectedListing.Plaintext &&(
                                    <button onClick={extractskills}>extract skills from plaintext?</button>
                                )}
                            </div>
                        ) : (
                            <div>
                                <p>required job skills:</p>
                                <ul>
                                    {skills.map(skill => (
                                    <li key={skill.Skill_Name}>{skill.Skill_Name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <br/>
                        <form onSubmit={addSkill}>
                            <label>Manually add new required skill to Listing?</label> <br />
                            <input type='text' value={skilltoadd} onChange={(e) => setSkillToAdd(e.target.value)} />
                            <button type='submit'>add skill</button>
                        </form>
                        <form onSubmit={deleteskill}>
                            <label>remove skill from profile</label> <br />
                            <input type='text' value={skilltodel} onChange={(e) => setSkillToDel(e.target.value)} />
                            <button type='submit'>delete skill</button>
                        </form>
                        <br/>
                        <button onClick={deleteskills}>Delete all skills from listing?</button>
                        <br/>
                        <button onClick={deletelisting}>Delete Listing </button>
                    </div>
                )}
                </div>
            )}
            
        </div>
    )};
export default TestJob;