from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load GPT-2 pipeline
generator = pipeline("text-generation", model="gpt2")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate_text():
    data = request.get_json()
    prompt = data.get("prompt", "")
    max_length = int(data.get("max_length", 50))
    temperature = float(data.get("temperature", 0.7))
    top_k = int(data.get("top_k", 50))
    top_p = float(data.get("top_p", 0.95))

    result = generator(
        prompt,
        max_length=max_length,
        temperature=temperature,
        top_k=top_k,
        top_p=top_p,
        num_return_sequences=1
    )
    return jsonify({"text": result[0]["generated_text"]})

if __name__ == "__main__":
    app.run(debug=True)
