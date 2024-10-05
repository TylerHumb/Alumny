from flask import Flask
import testlogic
import claude
from flask import jsonify,abort
app = Flask(__name__)


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
        print("entered try")
        skillextractor = claude.SkillExtractor()
        print('initialised skillextractor')
        skillextractor.extractEmployeeSkills(id)
        return jsonify({'message':"OK"}),200
    except:
        return abort(404,description = 'Error occured during execution')

@app.route('/deleteallemp/<int:id>')
def deleteallemp(id):
    return testlogic.deleteAllEmployee(id)


if __name__ == "__main__":
    app.run(debug=True)