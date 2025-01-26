from flask import Blueprint, request, jsonify, redirect, url_for
from flask_dance.contrib.github import make_github_blueprint, github
from flask_dance.contrib.google import make_google_blueprint, google

# Configuration OAuth pour GitHub
github_bp = make_github_blueprint(
    client_id="Ov23liR8gvKipvNlVEiZ",
    client_secret="b154262e8a1a12505cd2946bcdefca84f70f22ae",
    redirect_to="auth.github_callback"  # Redirection après authentification GitHub
)

# Configuration OAuth pour Google
google_bp = make_google_blueprint(
    client_id="VOTRE_ID_CLIENT_GOOGLE",
    client_secret="VOTRE_SECRET_CLIENT_GOOGLE",
    redirect_to="auth.google_callback"  # Redirection après authentification Google
)

# Créez un blueprint pour les routes d'authentification
auth_bp = Blueprint('auth', __name__)

# Simuler une base de données pour les utilisateurs
USERS = {}

# Route pour inscription par e-mail
@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "E-mail et mot de passe sont requis."}), 400

    if email in USERS:
        return jsonify({"message": "Cet e-mail est déjà utilisé."}), 400

    USERS[email] = {"password": password, "provider": "email"}
    return jsonify({"message": "Compte créé avec succès !"}), 200

# Route pour gérer l'authentification via GitHub
@auth_bp.route('/')
def github_callback():
    if not github.authorized:
        return redirect(url_for('github.login'))
    else:
        account_info = github.get('/user')
        if account_info.ok:
            account_info_json = account_info.json()
            return '<h1>Your Github name is {}'.format(account_info_json['login'])

    return '<h1>Request failed!</h1>'


# Route pour gérer l'authentification via Google
@auth_bp.route('/auth/google/callback')
def google_callback():
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/oauth2/v1/userinfo")
    if resp.ok:
        user_info = resp.json()
        email = user_info.get("email")
        if email not in USERS:
            USERS[email] = {"provider": "google"}
        return jsonify({"message": "Authentifié avec succès via Google", "user": email}), 200
    return jsonify({"message": "Échec de l'authentification Google."}), 400
