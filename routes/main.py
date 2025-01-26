from flask import Blueprint, send_from_directory

main_bp = Blueprint('main', __name__)

# Route principale pour servir React
@main_bp.route('/')
def index():
    return send_from_directory('static', 'index.html')
