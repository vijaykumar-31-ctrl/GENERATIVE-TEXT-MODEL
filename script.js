document.getElementById("generateBtn").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    const max_length = document.getElementById("max_length").value;
    const temperature = document.getElementById("temperature").value;
    const top_k = document.getElementById("top_k").value;
    const top_p = document.getElementById("top_p").value;

    if (!prompt.trim()) {
        alert("Please enter a prompt!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("outputSection").classList.add("hidden");

    const res = await fetch("/generate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ prompt, max_length, temperature, top_k, top_p })
    });

    const data = await res.json();

    document.getElementById("loading").classList.add("hidden");
    document.getElementById("output").innerText = data.text;
    document.getElementById("outputSection").classList.remove("hidden");
});

document.getElementById("copyBtn").addEventListener("click", () => {
    const text = document.getElementById("output").innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
});
