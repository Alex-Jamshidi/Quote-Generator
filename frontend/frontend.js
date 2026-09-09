QUOTE_API_URL = "http://127.0.0.1:3000/";

window.addEventListener("load", () => {
  updateQuote();
  document.getElementById("new-quote").addEventListener("click", updateQuote);
});

async function updateQuote() {
  quoteContainer = document.getElementById("quote");
  authorContainer = document.getElementById("author");
  try {
    let attempt = 0;
    do {
      attempt += 1;
      new_quote = await fetchQuote(QUOTE_API_URL);
    } while (quoteContainer.innerText == new_quote.quote && attempt < 10);

    quoteContainer.innerText = new_quote.quote;
    authorContainer.innerText = new_quote.author;
  } catch (error) {
    console.error(error);
  }
  return new_quote;
}

async function fetchQuote(url) {
  return fetch(url).then((result) => {
    if (!result.ok) throw new Error("Failed to load quote.");
    return result.json();
  });
}
