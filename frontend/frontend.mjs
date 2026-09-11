const QUOTE_BACKEND_URL = "https://wnwb6d7ykhntj8baadogfael.trainees.hosting.cyf.academy/";

window.addEventListener("load", () => {
  updateQuote();
  document.getElementById("new-quote").addEventListener("click", updateQuote);
  document.getElementById("add-quote").addEventListener("click", addQuote);
});

async function updateQuote() {
  const quoteContainer = document.getElementById("quote");
  const authorContainer = document.getElementById("author");
  try {
    let attempt = 0;
    let new_quote;
    do {
      attempt += 1;
      new_quote = await fetchQuote(QUOTE_BACKEND_URL);
    } while (quoteContainer.innerText == new_quote.quote && attempt < 10);

    quoteContainer.innerText = new_quote.quote;
    authorContainer.innerText = new_quote.author;
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuote(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to load quote.");
  return response.json();
}

async function addQuote() {
  const quoteInput = document.getElementById("quote-input");
  const authorInput = document.getElementById("author-input");
  const messageOutput = document.getElementById("output-message");

  messageOutput.innerText = "";
  if (quoteInput.value.trim() === "" || authorInput.value.trim() === "") {
    messageOutput.innerText = "Please complete all fields.";
    return;
  }
  const quote = { quote: quoteInput.value.trim(), author: authorInput.value.trim() };

  try {
    await postQuote(QUOTE_BACKEND_URL, quote);
    quoteInput.value = "";
    authorInput.value = "";
    messageOutput.innerText = "Quote added successfully.";
  } catch (error) {
    console.error(error);
    messageOutput.innerText = "Failed to add quote. Please try again.";
  }
}

async function postQuote(url, quote) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote),
  });
  if (!response.ok) throw new Error("Failed to add quote.");
}
