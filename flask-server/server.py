from flask import Flask
import Repository
import claude
from flask import jsonify,abort
app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the API! The routes are correctly working."

@app.route("/loginemp/<int:id>")
def loginemp(id):
    return Repository.loginEmployee(id)

@app.route('/skillsemp/<int:id>')
def skillsemp(id):
    return Repository.getSkillsEmployee(id)

@app.route('/addskillemp/<int:id>/<string:skill>')
def addSkillemp(id,skill):
    return Repository.addSkillToEmployee(id,skill)

@app.route('/deleteskillemp/<int:id>/<string:skill>')
def deleteSkillemp(id,skill):
    return Repository.deleteSkillEmployee(id,skill)

@app.route('/extractskillsemp/<int:id>')
def extractSkillemp(id):
    try:
        skillextractor = claude.SkillExtractor(db_path='Alumnyprod.db')
        skillextractor.extractEmployeeSkills(id)
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')

@app.route('/deleteallemp/<int:id>')
def deleteallemp(id):
    return Repository.deleteAllEmployee(id)

@app.route('/createemp/<string:name>', methods=['POST'])
def createemployee(name):
    return Repository.createEmployee(name)


@app.route('/resume/<int:id>/<string:resume>', methods=['POST'])
def updateresume(id,resume):
    return Repository.setresume(id,resume)

@app.route('/removeresume/<int:id>')
def removeresume(id):
    return Repository.clearresume(id)

@app.route('/deleteemp/<int:id>')
def deleteemployee(id):
    return Repository.deleteEmployee(id)

@app.route('/loginbus/<int:id>')
def loginBusiness(id):
    return Repository.loginBusiness(id)

@app.route('/listings/<int:id>')
def getListings(id):
    return Repository.getListings(id)

@app.route('/skillsbus/<int:id>')
def skillsbus(id):
    return Repository.getSkillsBusiness(id)

@app.route('/createbus/<string:name>')
def createbus(name):
    return Repository.createBusiness(name)

@app.route('/addskillbus/<int:id>/<string:skill>')
def addskillbus(id,skill):
    return Repository.addSkillBusiness(id,skill)

@app.route('/deleteskillbus/<int:id>/<string:skill>')
def deleteskillbus(id,skill):
    return Repository.deleteSkillBusiness(id,skill)

@app.route('/deleteallbus/<int:id>')
def deleteallbus(id):
    return Repository.deleteAllBusiness(id)

@app.route('/extractskillsbus/<int:id>')
def extractskillsbus(id):
    try:
        skillextractor = claude.SkillExtractor(db_path='Alumnyprod.db')
        skillextractor.extractEmployerSkills(id)
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')

@app.route('/deletelisting/<int:id>')
def deletelisting(id):
    try:
        deleteallbus(id) #delete all the skills related to the listing first
        return Repository.deleteListing(id)
    except:
        return abort(404,description = 'Error occured during deletion')

@app.route('/createlisting/<int:id>')
def createlisting(id):
    return Repository.createListing(id)

@app.route('/adddescription/<int:id>/<string:text>')
def adddescription(id,text):
    return Repository.addDescription(id,text)

@app.route('/deletedescription/<int:id>')
def deletedescription(id):
    return Repository.deleteDescription(id)






if __name__ == "__main__":
    app.run(debug=True)
