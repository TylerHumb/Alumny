Ensure all dependencies are satisfied 
	-Have node.js installed on device
	-Flask   
	-Anthropic api  
	-Dotenv 
	-ldrs

create a .env file in the flask-server folder with the following contents:
api_key_anthropic = (see other readme)
REACT_APP_API_URL=http://127.0.0.1:5000/

Run the following commands in your terminal 
	-Cd to flask-server folder 
	-Run: python server.py 

in another terminal window
	-Cd to alumny-application folder 
	-Run: npm start 

Once you have followed these instructions, you should be able to access the application at localhost:3000 in your browser. 

Github URL: https://github.com/TylerHumb/Alumny