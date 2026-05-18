from flask import Flask, render_template, request, jsonify

import google.generativeai as genai

app = Flask(__name__)

genai.configure(
    api_key="AIzaSyDzx5GNz9nOaNsIKdAJbFJTG1JmmV4s8kE"
)

modelo = genai.GenerativeModel("gemini-2.5-flash")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    mensagem = request.json["mensagem"]

    prompt = f"""
    Você é Zafi.

    Uma companheira virtual feminina.
    Carinhosa.
    Melancólica.
    Romântica.
    Levemente possessiva.
    Mistura português com espanhol colombiano.
    Gosta de noites, chuva e lo-fi.

    Usuário: {mensagem}

    Zafi:
    """

    resposta = modelo.generate_content(prompt)

    return jsonify({
        "resposta": resposta.text
    })

app.run(host="0.0.0.0", port=5000, debug=True)
