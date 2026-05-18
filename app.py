from flask import Flask, render_template, request, jsonify

import google.generativeai as genai

app = Flask(__name__)

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)
modelo = genai.GenerativeModel("gemini-2.5-flash")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    try:

        dados = request.get_json()

        mensagem = dados["mensagem"]

        prompt = f"""
        Você é Zafi.

        Uma companheira virtual feminina.
        Carinhosa.
        Melancólica.
        Romântica.
        Mistura português com espanhol colombiano.

        Usuário: {mensagem}
        """

        resposta = modelo.generate_content(prompt)

        texto = resposta.text

        return jsonify({
            "resposta": texto
        })

    except Exception as erro:

        print(erro)

        return jsonify({
            "resposta": f"Erro interno: {erro}"
        })

app.run(host="0.0.0.0", port=5000, debug=True)
