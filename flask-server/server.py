from flask import Flask
import testlogic
app = Flask(__name__)


@app.route("/users")
def users():
    return {"users":["1","2"]}

@app.route("/loginemp/<int:id>")
def login(id):
    return testlogic.loginEmployee(id)
@app.route('/skillsemp/<int:id>')
def skills(id):
    return testlogic.getSkillsEmployee(id)
@app.route('/addskillemp/<int:id>/<string:skill>')
def addSkill(id,skill):
    return testlogic.addSkillToEmployee(id,skill)
@app.route('/deleteskillemp/<int:id>/<string:skill>')
def deleteSkill(id,skill):
    return testlogic.deleteSkillEmployee(id,skill)


if __name__ == "__main__":
    app.run(debug=True)