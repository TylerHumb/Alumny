from flask import Flask
import testlogic
import claude
from flask import jsonify,abort
app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the API! The routes are correctly working."

@app.route("/loginemp/<int:id>")
def loginemp(id):
    return testlogic.loginEmployee(id)

@app.route('/skillsemp/<int:id>')
def skillsemp(id):
    return testlogic.getSkillsEmployee(id)

@app.route('/addskillemp/<int:id>/<string:skill>')
def addSkillemp(id,skill):
    return testlogic.addSkillToEmployee(id,skill)

@app.route('/deleteskillemp/<int:id>/<string:skill>')
def deleteSkillemp(id,skill):
    return testlogic.deleteSkillEmployee(id,skill)

@app.route('/extractskillsemp/<int:id>')
def extractSkillemp(id):
    try:
        skillextractor = claude.SkillExtractor()
        skillextractor.extractEmployeeSkills(id)
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')

@app.route('/deleteallemp/<int:id>')
def deleteallemp(id):
    return testlogic.deleteAllEmployee(id)

@app.route('/createemp/<string:name>', methods=['POST'])
def createemployee(name):
    return testlogic.createEmployee(name)


@app.route('/resume/<int:id>/<string:resume>', methods=['POST'])
def updateresume(id,resume):
    return testlogic.setresume(id,resume)

@app.route('/removeresume/<int:id>')
def removeresume(id):
    return testlogic.clearresume(id)

@app.route('/deleteemp/<int:id>')
def deleteemployee(id):
    return testlogic.deleteEmployee(id)

if __name__ == "__main__":
    app.run(debug=True)