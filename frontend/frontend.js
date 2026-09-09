QUOTE_API_URL = "http://127.0.0.1:3000/";

window.addEventListener("load", () => {
  updateQuote();
  document.getElementById("new-quote").addEventListener("click", updateQuote);
});

async function updateQuote() {
  try {
    quote = await fetchQuote(QUOTE_API_URL);
    document.getElementById("quote").innerText = quote.quote;
    document.getElementById("author").innerText = quote.author;
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuote(url) {
  return fetch(url).then((result) => {
    if (!result.ok) throw new Error("Failed to load quote.");
    return result.json();
  });
}
