const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API

async function getQuote() {
  showLoadingSpinner();
  const apiUrl = `https://api.quotable.io/random`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // if there is no author show unknown text
    if (data.author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.author;
    }
    // Reduce font size if content is larger than 100 character
    if (data.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.content;
    removeLoadingSpinner();
  } catch (error) {
    console.log(`whoops , no quote`, error);
  }
}

newQuoteBtn.addEventListener("click", function () {
  getQuote();
});

// on Load
getQuote();
