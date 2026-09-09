QUOTE_API_URL = "http://127.0.0.1:3000/";

window.addEventListener("load", () => {
  updateQuote();
  document.getElementById("new-quote").addEventListener("click", updateQuote);
});

function updateQuote() {
  quote = fetchQuote(QUOTE_API_URL);
  document.getElementById("quote").innerText = quote.quote;
  document.getElementById("author").innerText = quote.author;
}

function fetchQuote(url) {
  return fetch(url)
    .then((result) => {
      if (!result.ok) throw new Error("Failed to load quote.");
      return result.json;
    })
    .then((quote) => {
      return quote;
    });
}
