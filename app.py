from flask import Flask, send_from_directory
from routes.auth import auth_bp, github_bp, google_bp
from routes.main import main_bp

# Initialisation de l'application Flask
app = Flask(__name__, static_folder='static', template_folder='static')
app.secret_key = "7e3036709fb8157e24b4160174f826aefd892d7f4391276b930e7f426cc0897b"  # Nécessaire pour Flask-Dance

# Route principale pour servir React
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Route pour gérer les routes React
@app.route('/<path:path>')
def catch_all(path):
    try:
        return send_from_directory(app.static_folder, path)
    except:
        return send_from_directory(app.static_folder, 'index.html')

# Enregistrement des blueprints
app.register_blueprint(main_bp, url_prefix='/main')
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(github_bp, url_prefix='/login/github')  # Gestion OAuth pour GitHub
app.register_blueprint(google_bp, url_prefix='/login/google')  # Gestion OAuth pour Google

if __name__ == '__main__':
    app.run(debug=True)
