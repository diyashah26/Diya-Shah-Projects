const container = document.getElementById("facts-container");

// Function to render facts as cards
function renderFacts(facts) {
    container.innerHTML = ""; // Clear existing content
    facts.forEach((fact) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="header">
                <span class="icon">${fact.icon}</span>
                <h1>${fact.title}</h1>
            </div>
            <p>${fact.description}</p>
        `;
        container.appendChild(card);
    });
}

// Sample facts data (to be fetched from fact.js)
const facts = [
    { icon: "💡", title: "1.Length", description: "The Indian Constitution is the world's longest written constitution. When it was implemented in 1950, it was made up of 395 articles and 8 schedules, and was about 145,000 words long." },
    { icon: "💡", title: "2.Preamble", description: "The Preamble of the Constitution is a key part of the Constitution, and is considered to be the foundation of its philosophy. It is a basic structure of the Constitution, and is a key feature for every amendment." },
    { icon: "💡", title: "3.Fundamental Rights", description: "The Constitution guarantees fundamental rights to all citizens, which ensure equality and freedom." },
    { icon: "💡", title: "4.Secular State?", description: "The Constitution establishes India as a secular nation, which promotes harmony among different religions." },
    { icon: "💡", title: "5.Federal Structure", description: "India has a federal system, where powers are shared between the central government and state governments." },
    { icon: "💡", title: "6.Amendment Process", description: "The Constitution has a clear process for making changes, which allows it to adapt to new situations."},
    { icon: "💡", title: '7.Borrowings' , description :"The Constitution borrowed some features from the USA, and fundamental duties and the ideal of justice from the USSR."},
    { icon: "💡", title: '8.Original Constitution' , description :"The original Constitution is handwritten, and each page was decorated by artists from Shantiniketan."},
    { icon: "💡", title: '9.Symbolism' , description :"The elephant is the symbol of the constituent assembly."},
];

// Render the facts
renderFacts(facts);