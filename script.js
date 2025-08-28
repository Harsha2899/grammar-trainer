const startBtn = document.getElementById("startBtn");
const exerciseSelect = document.getElementById("exercise");
const backToSectionsBtn = document.getElementById("backToSectionsBtn");
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const introContentDiv = document.getElementById("introContent");
const startQuizBtn = document.getElementById("startQuizBtn");
const questionArea = document.getElementById("questionArea");
const quizTitle = document.getElementById("quizTitle");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const hintBtn = document.getElementById("hintBtn");
const hint = document.getElementById("hint");
const nextBtn = document.getElementById("nextBtn");
const feedbackDiv = document.createElement("div");
feedbackDiv.style.marginTop = "15px";
feedbackDiv.style.fontWeight = "bold";
questionArea.appendChild(feedbackDiv);
const emailPage = document.getElementById("emailPage");
const emailInput = document.getElementById("emailInput");
const emailSubmitBtn = document.getElementById("emailSubmitBtn");
const scorePage = document.getElementById("scorePage");
const finalScoreText = document.getElementById("finalScoreText");
const summaryText = document.getElementById("summaryText");
const continueBtn = document.getElementById("continueBtn");

let quizData = [];
let currentIndex = 0;
let wrongTopics = new Set();
let isSATLevel = false;
let userEmail = "";
let correctAnswers = 0;
let totalQuestions = 0;
let hintUsed = false;
let quizLog = [];

// Keep your original introContent intact - PASTE YOUR INTRO CONTENT HERE
const introContent = {"Inferences": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inference on the SAT</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2 {
            color: #2c3e50;
        }
        h1 {
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        .section {
            margin-bottom: 20px;
        }
        .tip, .trap {
            background-color: #f4f4f4;
            border-left: 4px solid #3498db;
            padding: 10px;
            margin: 15px 0;
        }
        .trap {
            border-color: #e74c3c;
        }
        .bilingual-text {
            display: flex;
            gap: 20px;
        }
        .english, .polish {
            flex: 1;
        }
    </style>
</head>
<body>

    <div class="section">
        <h1>Inference Fundamentals (Podstawy Wnioskowania)</h1>
        <div class="bilingual-text">
            <div class="english">
                <p><strong>What is Inference on the SAT?</strong> Inference is when you make a conclusion that isn't directly stated in the text. It's a key skill for the SAT because it shows you can read between the lines.</p>
                <p>In a regular English class, your teacher might ask for your opinion on a book, like whether Gatsby is a good guy. On the SAT, it's different. You can't guess or speculate. The correct answer must be supported by the information given in the passage.</p>
                <p>Think of it like a basketball play. You see your teammate pass the ball and another player run to the basket. You can infer that they are running a give-and-go play, even if the coach didn't shout it out.</p>
                <div class="tip">
                    <p><strong>Tip:</strong> If you ever think "If X is true, then this answer works," stop and ask yourself if the text actually says X is true. If not, the answer is probably wrong.</p>
                </div>
            </div>
            <div class="polish">
                <p><strong>Czym jest wnioskowanie na SAT?</strong> Wnioskowanie to wyciąganie wniosków, które nie są bezpośrednio podane w tekście. To kluczowa umiejętność na SAT, bo pokazuje, że potrafisz czytać między wierszami.</p>
                <p>Na lekcji angielskiego nauczyciel może pytać o twoją opinię na temat książki. Na SAT jest inaczej. Nie możesz zgadywać ani spekulować. Poprawna odpowiedź musi być w 100% poparta informacjami z tekstu.</p>
                <p>Pomyśl o tym jak o akcji w koszykówce. Widzisz, że twój kolega z drużyny podaje piłkę, a inny biegnie pod kosz. Możesz wywnioskować, że grają akcję "podaj i biegnij", nawet jeśli trener tego nie krzyczał.</p>
                <div class="tip">
                    <p><strong>Wskazówka:</strong> Jeśli pomyślisz sobie "Jeśli X jest prawdą, to ta odpowiedź działa", zatrzymaj się i zapytaj, czy tekst faktycznie mówi, że X jest prawdą. Jeśli nie, odpowiedź jest prawdopodobnie błędna.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>How to Solve Inference Questions (Jak rozwiązywać pytania dotyczące wnioskowania)</h2>
        <ul>
            <li><strong>Simplify the Text:</strong> Don't get lost in the details. Find the main ideas. Like on the court, you don't need to notice every single movement; you just need to see the main action.</li>
            <li><strong>Don't Predict:</strong> Don't try to guess the answer before looking at the choices. Read the passage and the question first, then look at the options.</li>
            <li><strong>Identify the Topic:</strong> What is the question really asking about? Focus on the key information that connects to the blank space.</li>
            <li><strong>Work by Elimination:</strong> This is your best strategy. Look for reasons why an answer is wrong, not just why one is right.</li>
        </ul>
        <h3>Jak rozwiązywać pytania dotyczące wnioskowania</h3>
        <ul>
            <li><strong>Uprość tekst:</strong> Nie gub się w szczegółach. Znajdź główne idee. Podobnie jak na boisku, nie musisz zauważać każdego pojedynczego ruchu; wystarczy, że zobaczysz główną akcję.</li>
            <li><strong>Nie przewiduj:</strong> Nie próbuj zgadywać odpowiedzi przed przejrzeniem opcji. Najpierw przeczytaj tekst i pytanie, a następnie spójrz na opcje.</li>
            <li><strong>Zidentyfikuj temat:</strong> O co tak naprawdę pyta pytanie? Skoncentruj się na kluczowych informacjach, które łączą się z luką.</li>
            <li><strong>Eliminuj błędne odpowiedzi:</strong> To twoja najlepsza strategia. Szukaj powodów, dla których odpowiedź jest zła, a nie tylko dlaczego jedna jest poprawna.</li>
        </ul>
    </div>

    <div class="section">
        <h2>Inference Patterns (Wzorce wnioskowania)</h2>
        <p>These are common types of inference questions you'll see. Knowing them is like knowing the different plays in basketball.</p>
        <p>To są typowe rodzaje pytań o wnioskowanie, które zobaczysz. Znanie ich jest jak znajomość różnych akcji w koszykówce.</p>

        <h3>Cause and Effect (Przyczyna i skutek)</h3>
        <div class="bilingual-text">
            <div class="english">
                <p>This is about how one thing makes another thing happen. For example, if your team practices free throws every day, you can expect your free-throw percentage to go up. The practice is the cause, and the higher percentage is the effect.</p>
                <p>SAT questions often present a correlation (two things happening together) and ask you to infer a possible cause. But remember, correlation is not always causation. Just because you and your friend both have new shoes and are scoring more points doesn't mean the shoes are the reason. Maybe you both just practiced more.</p>
            </div>
            <div class="polish">
                <p>To, jak jedna rzecz powoduje drugą. Na przykład, jeśli twoja drużyna trenuje rzuty wolne codziennie, możesz się spodziewać, że wasz procent trafień wzrośnie. Trening to przyczyna, a wyższy procent to skutek.</p>
                <p>Pytania na SAT często przedstawiają korelację (dwie rzeczy dzieją się razem) i proszą o wywnioskowanie możliwej przyczyny. Ale pamiętaj, korelacja nie zawsze oznacza przyczynowość. To, że ty i twój kolega macie nowe buty i zdobywacie więcej punktów, nie oznacza, że to buty są tego powodem. Być może po prostu obaj więcej trenowaliście.</p>
            </div>
        </div>

        <h4>No Correlation = No Causality (Brak korelacji = brak przyczynowości)</h4>
        <div class="bilingual-text">
            <div class="english">
                <p>If two things have no connection, one cannot cause the other. This is an important rule to remember.</p>
                <p>For example, if a study shows that dribbling the ball with your left hand doesn't improve your right-hand shot, you can infer that left-hand dribbling is not essential for a better right-hand shot.</p>
            </div>
            <div class="polish">
                <p>Jeśli dwie rzeczy nie mają żadnego związku, jedna nie może być przyczyną drugiej. To ważna zasada.</p>
                <p>Na przykład, jeśli badanie pokazuje, że kozłowanie lewą ręką nie poprawia rzutu prawą ręką, możesz wywnioskować, że kozłowanie lewą ręką nie jest kluczowe dla lepszego rzutu prawą ręką.</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Inference Traps (Pułapki wnioskowania)</h2>
        <p>Watch out for these common mistakes that can trick you. They're like defenders trying to block your shot.</p>
        <p>Uważaj na te powszechne błędy, które mogą cię zwieść. Są jak obrońcy próbujący zablokować twój rzut.</p>

        <div class="trap">
            <h3>Second Guessing (Wahanie się)</h3>
            <div class="bilingual-text">
                <div class="english">
                    <p>Don't second-guess yourself if the answer seems too easy. If a choice is clearly supported by the text, it's probably correct. Don't eliminate a good answer just because it seems simple.</p>
                </div>
                <div class="polish">
                    <p>Nie wahaj się, jeśli odpowiedź wydaje się zbyt prosta. Jeśli wybór jest wyraźnie poparty tekstem, jest prawdopodobnie poprawny. Nie eliminuj dobrej odpowiedzi tylko dlatego, że wydaje się prosta.</p>
                </div>
            </div>
        </div>

        <div class="trap">
            <h3>Overgeneralization (Nadmierne uogólnianie)</h3>
            <div class="bilingual-text">
                <div class="english">
                    <p>Don't assume too much. If the text says "some" of something happened, you can't infer that "most" or "all" of it happened. Stick to what the text says.</p>
                </div>
                <div class="polish">
                    <p>Nie zakładaj zbyt wiele. Jeśli tekst mówi, że "niektóre" rzeczy się wydarzyły, nie możesz wywnioskować, że "większość" lub "wszystkie" się wydarzyły. Trzymaj się tego, co mówi tekst.</p>
                </div>
            </div>
        </div>

        <div class="trap">
            <h3>Point-of-View Shifts (Zmiana punktu widzenia)</h3>
            <div class="bilingual-text">
                <div class="english">
                    <p>Pay attention to whose opinion is being discussed. The text might talk about what "they say" (some people believe...) but then pivot with a word like "however" to present the author's true point of view.</p>
                </div>
                <div class="polish">
                    <p>Zwracaj uwagę na to, czyja opinia jest omawiana. Tekst może mówić o tym, co "oni mówią" (niektórzy ludzie wierzą...), ale potem zmienić kierunek słowem jak "jednak" i przedstawić prawdziwy punkt widzenia autora.</p>
                </div>
            </div>
        </div>

        <div class="trap">
            <h3>Contradictory Information (Informacje sprzeczne)</h3>
            <div class="bilingual-text">
                <div class="english">
                    <p>Some wrong answers will seem logical, but they're based on facts that are directly contradicted by the passage. Always double-check that the information in the answer choice doesn't conflict with the text.</p>
                </div>
                <div class="polish">
                    <p>Niektóre błędne odpowiedzi będą wydawać się logiczne, ale opierają się na faktach, które są bezpośrednio sprzeczne z tekstem. Zawsze upewnij się, że informacja w odpowiedzi nie jest sprzeczna z tekstem.</p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>`,
  "Textual Evidence": `<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SAT Textual Evidence: Finding the Best Quote</title>
<style>
body {
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
line-height: 1.6;
color: #333;
max-width: 900px;
margin: 0 auto;
padding: 20px;
background-color: #f4f4f9;
}
.container {
background: #fff;
padding: 30px;
border-radius: 12px;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
h1 {
color: #1a1a1a;
text-align: center;
font-size: 2.5em;
margin-bottom: 0.5em;
}
h2 {
color: #4a4a4a;
border-bottom: 2px solid #e0e0e0;
padding-bottom: 5px;
margin-top: 2em;
font-size: 1.8em;
}
h3 {
color: #5a5a5a;
margin-top: 1.5em;
}
p {
margin-bottom: 1em;
font-size: 1.1em;
}
.polish-text {
color: #666;
font-style: italic;
margin-top: -1em;
margin-bottom: 1em;
padding-left: 20px;
border-left: 3px solid #ddd;
}
.highlight {
background-color: #ffeb3b;
padding: 2px 5px;
border-radius: 4px;
}
.example-box {
border: 2px solid #4CAF50;
border-left: 5px solid #4CAF50;
padding: 20px;
margin: 20px 0;
background-color: #e8f5e9;
border-radius: 8px;
}
.tip-box {
border: 2px solid #2196F3;
border-left: 5px solid #2196F3;
padding: 15px;
margin: 15px 0;
background-color: #e3f2fd;
border-radius: 8px;
}
.warning-box {
border: 2px solid #f44336;
border-left: 5px solid #f44336;
padding: 15px;
margin: 15px 0;
background-color: #ffebee;
border-radius: 8px;
}
.code-block {
background-color: #f8f8f8;
border: 1px solid #ddd;
padding: 15px;
border-radius: 8px;
margin-top: 1em;
}
ul, ol {
padding-left: 25px;
margin-bottom: 1em;
}
li {
margin-bottom: 0.5em;
}
.emoji {
font-size: 1.2em;
}
hr {
border: none;
height: 1px;
background-color: #e0e0e0;
margin: 40px 0;
}
</style>
</head>
<body>

<div class="container">
<h1>Textual-Evidence Questions: Finding Your Highlight Reel 🎥</h1>
<p>English: These questions ask you to find the best quotation from a text that supports a specific statement or "claim." The claim is a sentence that makes an assertion about the text. Your job is to find the part of the passage that acts as proof for that claim. Think of it as finding a highlight reel to prove a player's skill. You need to find the video clip (the quote) that shows the player doing exactly what the claim says they can do. </p>
<p class="polish-text">Polish: Te pytania proszą Cię o znalezienie najlepszego cytatu z tekstu, który wspiera konkretne stwierdzenie lub „tezę” (claim). Teza to zdanie, które coś twierdzi na temat tekstu. Twoim zadaniem jest znalezienie tej części fragmentu, która stanowi dowód na tę tezę. Pomyśl o tym, jak o szukaniu wideo-klipu, który udowadnia umiejętności gracza. Musisz znaleźć fragment wideo (cytat), który pokazuje, że gracz robi dokładnie to, co mówi teza.</p>

<hr>

<h2>The Game Plan: How to Solve It</h2>
<h3>Step 1: Read the Play (the Text) 📖</h3>
<p>English: Read the whole passage first. Don't skip ahead. Just like a good point guard reads the defense, you need to get the basic idea of the entire text. This will help you understand the context of the claim.</p>
<p class="polish-text">Polish: Przeczytaj najpierw cały fragment. Nie pomijaj niczego. Tak jak dobry rozgrywający czyta obronę, Ty musisz zrozumieć ogólny zarys całego tekstu. Pomoże Ci to zrozumieć kontekst tezy.</p>

<h3>Step 2: Find the Claim (the Scout's Report) 🎯</h3>
<p>English: Find the sentence that makes the assertion. The question will usually point it out for you. Look for phrases like "the student claims that..." or "most effectively illustrates the claim." Sometimes the claim is just a statement in the text you need to find evidence for.</p>
<p class="polish-text">Polish: Znajdź zdanie, które zawiera tezę. Pytanie zazwyczaj Cię do tego naprowadzi. Szukaj fraz typu „uczeń twierdzi, że…” (the student claims that) lub „najbardziej efektywnie ilustruje tezę” (most effectively illustrates the claim). Czasami teza jest po prostu stwierdzeniem w tekście, dla którego musisz znaleźć dowody.</p>

<h3>Step 3: Break it Down (Analyze the Opponent) 🧠</h3>
<p>English: The claim is almost never about just one thing. It's like saying a player is good at "shooting and passing." You have two parts to check: shooting and passing. Break the claim into its parts. For example, if the claim is "Thurber contrasts Mitty's normal life with his heroic fantasies," you have two parts to look for in the quote:</p>
<ul>
    <li>Mitty's normal life</li>
    <li>Mitty's heroic fantasy</li>
</ul>
<p>The quote must show a contrast between them. The correct answer must support all parts of the claim.</p>
<p class="polish-text">Polish: Teza prawie nigdy nie dotyczy tylko jednej rzeczy. To jak powiedzenie, że zawodnik jest dobry w „rzucaniu i podawaniu”. Musisz sprawdzić dwie rzeczy: rzucanie i podawanie. Podziel tezę na części. Na przykład, jeśli teza brzmi „Thurber zestawia normalne życie Mitty'ego z jego heroicznymi fantazjami”, musisz szukać w cytacie dwóch elementów:
<ul>
    <li>Normalne życie Mitty'ego</li>
    <li>Heroiczne fantazje Mitty'ego</li>
</ul>
Cytat musi pokazywać kontrast między nimi. Poprawna odpowiedź musi wspierać wszystkie części tezy.</p>

<h3>Step 4: Use Elimination (Play Defense) 🗑️</h3>
<p>English: This is the most important step. Don't just look for the right answer. Look for the three wrong answers and get rid of them.</p>
<ul class="warning-box">
    <li>A choice is wrong if it only supports part of the claim.</li>
    <li>A choice is wrong if it talks about something completely different.</li>
    <li>A choice is wrong if it misrepresents the claim.</li>
</ul>
<p>The wrong answers are like a player faking a pass to get you to move the wrong way. Don't fall for it! Just because a quote has one word from the claim doesn't mean it's right.</p>
<p class="polish-text">Polish: To najważniejszy krok. Nie tylko szukaj poprawnej odpowiedzi. Szukaj trzech złych odpowiedzi i wyeliminuj je.
<ul>
    <li>Opcja jest błędna, jeśli wspiera tylko część tezy.</li>
    <li>Opcja jest błędna, jeśli mówi o czymś zupełnie innym.</li>
    <li>Opcja jest błędna, jeśli błędnie przedstawia tezę.</li>
</ul>
Błędne odpowiedzi są jak zawodnik, który udaje, że podaje, żebyś poruszył się w złą stronę. Nie daj się na to nabrać! To, że cytat zawiera jedno słowo z tezy, nie oznacza, że jest poprawny.</p>

<hr>

<h2>Example Walkthrough: The Cherry Orchard</h2>
<p>Let's break down the example about the play *The Cherry Orchard*.</p>

<h3>The Scenario (the play):</h3>
<ul>
    <li>A character named Madame Ranevsky is a landowner who is losing her estate.</li>
    <li>She is returning to her old estate.</li>
    <li>She feels nostalgic (nostalgic means she feels happy and a little sad about the past).</li>
</ul>

<h3>The Question (the goal):</h3>
<p>"The claim is that she feels nostalgic returning to her estate. Which quotation from a translation of The Cherry Orchard most effectively illustrates the claim?"</p>

<h3>The Logic (the strategy):</h3>
<p>The Claim: Madame Ranevsky feels nostalgic returning to her estate.</p>
<p>Break it down: We need to find a quote that shows her feeling emotional about the past and specifically about the estate.</p>
<div class="code-block">
    <p>Let's eliminate the choices:</p>
    <ul>
        <li>**A) "asks another character, 'What's made you look so bad? Why have you grown so old?'"** This is not about the estate or nostalgia. She's talking to another person. It doesn't support the claim. **Eliminate it.**</li>
        <li>**B) "complains, 'If only I could take my heavy burden off my breast and shoulders, if I could forget my past!'"** This talks about the past, but she wants to forget it. Nostalgia is about remembering it in a bittersweet way, not wanting to forget it. This is the wrong feeling. **Eliminate it.**</li>
        <li>**C) "observes, 'There's nobody there; I thought I saw somebody... a white little tree bent down, looking just like a woman.'"** This is about seeing things, maybe a little strange or poetic, but it doesn't clearly show an emotional connection to the past or the estate. **Eliminate it.**</li>
        <li>**D) "says, 'Oh, my childhood, days of my innocence! In this nursery I used to sleep; I used to look out from here into the orchard. Look, there's my mother going in the orchard.'"** This quote is perfect!
            <ul>
                <li>**Childhood, innocence:** These words show she feels nostalgic.</li>
                <li>**Nursery, orchard:** These words are parts of the estate.</li>
                <li>**My mother:** She's thinking about people from her past.</li>
            </ul>
        </li>
    </ul>
    <p>This quote supports all parts of the claim. It's the right answer.</p>
</div>
</div>

</body>
</html>`,
  "Word in Context": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAT Words-in-Context</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: auto;
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2, h3 {
            color: #0056b3;
            border-bottom: 2px solid #0056b3;
            padding-bottom: 5px;
        }
        .bilingual-section {
            display: flex;
            justify-content: space-between;
            gap: 20px;
        }
        .lang-column {
            flex: 1;
            padding: 10px;
            background: #e9e9e9;
            border-radius: 5px;
        }
        .lang-column h3 {
            margin-top: 0;
            border: none;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: #f0f8ff;
            margin-bottom: 10px;
            padding: 10px;
            border-left: 5px solid #007bff;
            border-radius: 3px;
        }
        strong {
            color: #d35400;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>An American Coach's Playbook for the SAT</h1>

    <div class="bilingual-section">
        <div class="lang-column">
            <h3>What Are Words-in-Context Questions? (English)</h3>
            <p>These questions are a major part of the SAT Reading section. You'll see them at the beginning of each module. They ask you to choose a word that fits best in a sentence. The key is to look at the <strong>context</strong>—the words and ideas around the blank—to figure out the correct meaning. Just because a word has one meaning you know doesn't mean it works in every sentence. For example, "dribble" can mean to move a basketball, but it also means a small amount of liquid. The context tells you which one is correct.</p>
        </div>
        <div class="lang-column">
            <h3>Czym są pytania "Words-in-Context"? (Polish)</h3>
            <p>Te pytania stanowią główną część sekcji czytania na SAT. Pojawiają się na początku każdego modułu. Proszą Cię o wybranie słowa, które najlepiej pasuje do zdania. Kluczem jest spojrzenie na <strong>kontekst</strong> — słowa i pomysły wokół luki — aby ustalić właściwe znaczenie. To, że znasz jedno znaczenie słowa, nie oznacza, że będzie ono pasować do każdego zdania. Na przykład, "dribble" może oznaczać prowadzenie piłki w koszykówce, ale także małą ilość płynu. Kontekst powie Ci, które znaczenie jest właściwe.</p>
        </div>
    </div>

    <hr>

    <h2>The Game Plan: Two Types of Questions</h2>

    <div class="bilingual-section">
        <div class="lang-column">
            <h3>1. Fill-in-the-Blank Questions 📝 (English)</h3>
            <p>These questions ask you to complete a sentence. The question is always the same: "Which choice completes the text with the most logical and precise word or phrase?"</p>
            <h4>Here's the strategy, step-by-step:</h4>
            <ul>
                <li>Read the whole sentence, not just the words around the blank.</li>
                <li>Look for clues. What are the other words in the sentence telling you? Do they suggest a positive or a negative idea?</li>
                <li>Predict an answer. Before you look at the choices, try to think of a word that could fit. This helps you avoid getting tricked by the wrong answers.</li>
                <li>Eliminate the wrong choices. Plug each answer choice into the sentence and see if it makes sense. The correct answer will be the one that fits perfectly.</li>
            </ul>
            <h4>Example:</h4>
            <p><strong>The sentence:</strong> "The painting... does not fully <strong>_______</strong> the artist's signature style."</p>
            <p><strong>Clues:</strong> The text mentions "skeptics' views" and that the painting has "uncharacteristically crude technique." This tells us the painting doesn't match Vermeer's style.</p>
            <p><strong>Prediction:</strong> A word like "match," "show," or "represent."</p>
            <p><strong>Checking choices:</strong></p>
            <ul>
                <li>A) consider: This doesn't make sense. Paintings can't "consider" a style.</li>
                <li>B) express: This fits. The painting doesn't fully "express" the style. It's a possible answer.</li>
                <li>C) disprove: The painting doesn't "disprove" the style itself; it just doesn't show it perfectly.</li>
                <li>D) confirm: This is the opposite of what the clues suggest.</li>
            </ul>
            <p><strong>Final Answer: B</strong> is the best choice.</p>
        </div>
        <div class="lang-column">
            <h3>1. Pytania "Fill-in-the-Blank" 📝 (Polish)</h3>
            <p>Te pytania proszą Cię o uzupełnienie zdania. Pytanie jest zawsze takie samo: „Która opcja uzupełnia tekst najbardziej logicznym i precyzyjnym słowem lub wyrażeniem?”.</p>
            <h4>Oto strategia, krok po kroku:</h4>
            <ul>
                <li>Przeczytaj całe zdanie, a nie tylko słowa wokół luki.</li>
                <li>Szukaj wskazówek. Co mówią Ci inne słowa w zdaniu? Czy sugerują pozytywną czy negatywną ideę?</li>
                <li>Przewidź odpowiedź. Zanim spojrzysz na opcje, spróbuj wymyślić słowo, które mogłoby pasować. To pomoże Ci uniknąć pułapek.</li>
                <li>Eliminuj błędne opcje. Wstaw każdą opcję do zdania i sprawdź, czy ma sens. Poprawna odpowiedź będzie tą, która pasuje idealnie.</li>
            </ul>
            <h4>Przykład:</h4>
            <p><strong>Zdanie:</strong> "Obraz... nie w pełni <strong>_______</strong> charakterystyczny styl artysty."</p>
            <p><strong>Wskazówki:</strong> Tekst wspomina o „poglądach sceptyków” oraz o tym, że obraz ma „nietypowo surową technikę”. To mówi nam, że obraz nie pasuje do stylu Vermeera.</p>
            <p><strong>Przewidywanie:</strong> Słowo takie jak "pasuje", "pokazuje" lub "reprezentuje".</p>
            <p><strong>Sprawdzanie opcji:</strong></p>
            <ul>
                <li>A) consider: To nie ma sensu. Obrazy nie mogą „rozważać” stylu.</li>
                <li>B) express: To pasuje. Obraz nie w pełni „wyraża” styl. To możliwa odpowiedź.</li>
                <li>C) disprove: Obraz nie „obalają” stylu, po prostu nie pokazuje go idealnie.</li>
                <li>D) confirm: To jest przeciwieństwo tego, co sugerują wskazówki.</li>
            </ul>
            <p><strong>Ostateczna odpowiedź: B</strong> jest najlepszym wyborem.</p>
        </div>
    </div>

    <hr>

    <div class="bilingual-section">
        <div class="lang-column">
            <h3>2. Define-the-Word Questions 📖 (English)</h3>
            <p>These questions ask for the meaning of a specific underlined word in a text, usually from literature. The word often has multiple meanings, but only one fits the sentence.</p>
            <h4>Strategy:</h4>
            <ul>
                <li>Read the sentence with the underlined word.</li>
                <li>Focus on the word's specific use. Ignore other meanings you might know.</li>
                <li>Substitute the answer choices into the sentence. The correct answer will be a synonym that fits the context perfectly.</li>
            </ul>
            <h4>Example:</h4>
            <p><strong>Sentence:</strong> "...he learned to make a few <strong>set</strong>, opening moves."</p>
            <p>The word "set" has many meanings: "to place," "a group," "fixed," "to adjust," etc.</p>
            <p><strong>The context:</strong> The character learned "a few" of these moves, suggesting they are a fixed, specific sequence of actions, not random ones.</p>
            <p><strong>Checking choices:</strong></p>
            <ul>
                <li>A) Adjusted: This doesn't fit. The moves aren't being "adjusted."</li>
                <li>B) Developed: This implies creating new moves, but the text says he learned a few specific ones.</li>
                <li>C) Fixed: This is perfect. It means the moves are established and unchanging.</li>
                <li>D) Positioned: While moves involve positioning, the word "set" here describes the type of moves, not the act of positioning.</li>
            </ul>
            <p><strong>Final Answer: C</strong> is the best fit.</p>
        </div>
        <div class="lang-column">
            <h3>2. Pytania "Define-the-Word" 📖 (Polish)</h3>
            <p>Te pytania dotyczą znaczenia konkretnego podkreślonego słowa w tekście, zazwyczaj z literatury. Słowo często ma wiele znaczeń, ale tylko jedno pasuje do zdania.</p>
            <h4>Strategia:</h4>
            <ul>
                <li>Przeczytaj zdanie z podkreślonym słowem.</li>
                <li>Skup się na konkretnym użyciu słowa. Ignoruj inne znaczenia, które możesz znać.</li>
                <li>Podstawiaj opcje odpowiedzi do zdania. Poprawna odpowiedź będzie synonimem, który pasuje do kontekstu idealnie.</li>
            </ul>
            <h4>Przykład:</h4>
            <p><strong>Zdanie:</strong> „…nauczył się robić kilka <strong>set</strong>, otwierających ruchów.” (w tym kontekście "set" to 'ustalone')</p>
            <p>Słowo „set” ma wiele znaczeń: „umieścić”, „zestaw”, „ustalony”, „dostosowany” itd.</p>
            <p><strong>Kontekst:</strong> Postać nauczyła się „kilku” z tych ruchów, co sugeruje, że są to ustalone, specyficzne sekwencje działań, a nie przypadkowe.</p>
            <p><strong>Sprawdzanie opcji:</strong></p>
            <ul>
                <li>A) Adjusted (dostosowane): To nie pasuje. Ruchy nie są „dostosowywane”.</li>
                <li>B) Developed (rozwinięte): To sugeruje tworzenie nowych ruchów, ale tekst mówi, że nauczył się kilku konkretnych.</li>
                <li>C) Fixed (ustalone): To jest idealne. Oznacza, że ruchy są ustalone i niezmienne.</li>
                <li>D) Positioned (ustawione): Chociaż ruchy wiążą się z ustawianiem, słowo „set” opisuje tutaj rodzaj ruchów, a nie akt ich ustawiania.</li>
            </ul>
            <p><strong>Ostateczna odpowiedź: C</strong> jest najlepszym wyborem.</p>
        </div>
    </div>

    <hr>

    <div class="bilingual-section">
        <div class="lang-column">
            <h3>Dealing with Tricky Words (English)</h3>
            <p>Sometimes, you'll see words you don't know. Don't panic! It's like seeing a new defense.</p>
            <ul>
                <li>Use the process of elimination first. Check all the other answers you do know. If a familiar word makes perfect sense, pick it! The SAT doesn't always choose the hardest word just to be tricky.</li>
                <li>If you have to guess, you've done all you can. But if you have a list of academic vocabulary (like from this course), you might recognize it!</li>
            </ul>
        </div>
        <div class="lang-column">
            <h3>Jak radzić sobie z trudnymi słowami (Polish)</h3>
            <p>Czasami zobaczysz słowa, których nie znasz. Nie panikuj! To jak zobaczenie nowej obrony.</p>
            <ul>
                <li>Najpierw użyj eliminacji. Sprawdź wszystkie inne odpowiedzi, które znasz. Jeśli znane słowo ma idealny sens, wybierz je! SAT nie zawsze wybiera najtrudniejsze słowo, żeby Cię oszukać.</li>
                <li>Jeśli musisz zgadywać, zrobiłeś wszystko, co mogłeś. Ale jeśli masz listę słownictwa akademickiego (na przykład z tego kursu), możesz je rozpoznać!</li>
            </ul>
        </div>
    </div>

</div>

</body>
</html>
`
};

// Helper: convert "YES"/"NO" to boolean
function yesNoToBool(value) {
  return value === "YES";
}

// Log the full quiz score
async function logUserQuiz(email, topic, score, hintUsed, qaLog) {
  try {
    const response = await fetch("/log-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        topic,
        score,
        hintUsed: yesNoToBool(hintUsed),
        qaLog: qaLog.map(q => ({
          ...q,
          hintUsed: yesNoToBool(q.hintUsed)
        })),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error logging score");
    console.log("✅ User quiz score logged:", data.message);
  } catch (err) {
    console.error("❌ Failed to log user quiz:", err);
  }
}

// Log a single question at a time
async function logQuestion(email, topic, questionEntry) {
  try {
    const response = await fetch("/log-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        topic,
        score: questionEntry.score,
        hintUsed: yesNoToBool(questionEntry.hintUsed),
        qaLog: [{
          ...questionEntry,
          hintUsed: yesNoToBool(questionEntry.hintUsed)
        }],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error logging question");
    console.log("✅ Question logged:", data.message);
  } catch (err) {
    console.error("❌ Failed to log question:", err);
  }
}


async function fetchStudyMaterial(topic) {
  try {
    const response = await fetch("/ai-study-material", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    if (!response.ok) throw new Error("Failed to fetch study material");
    return await response.json();
  } catch (e) {
    console.error("Error fetching study material:", e);
    return null;
  }
}

startBtn.addEventListener("click", () => {
  const topic = exerciseSelect.value;
  quizTitle.textContent = topic;
  introContentDiv.innerHTML = introContent[topic] || "";
  introContentDiv.style.display = "block";

  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  startQuizBtn.style.display = "block";
  questionArea.style.display = "none";
});

startQuizBtn.addEventListener("click", async () => {
  quizLog = []; // reset quiz log on new start
  correctAnswers = 0; // reset score!
  wrongTopics.clear();
  const userGmail = prompt("Please enter your Gmail address to begin:");
  if (userGmail && userGmail.includes("@gmail.com")) {
    userEmail = userGmail;
    introContentDiv.style.display = "none";
    startQuizBtn.style.display = "none";
    questionArea.style.display = "block";
    await loadQuiz(exerciseSelect.value);
  } else {
    alert("Please enter a valid Gmail address to start.");
  }
});
backToSectionsBtn.addEventListener("click", () => {
  // Hide the intro, show the start/sections page
  introContentDiv.style.display = "none";
  startScreen.style.display = "block";
});


async function loadQuiz(topic, isRemedial = false) {
  try {
    const body = {
      topic: topic,
      isSATLevel: isSATLevel,
      wrongTopics: isRemedial ? Array.from(wrongTopics) : [],
    };
    const res = await fetch("/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.details || "Server error.");
    }
    const data = await res.json();
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error("Bad quiz format");
    }
    quizData = data.questions;
    currentIndex = 0;
    correctAnswers = 0;
    totalQuestions = quizData.length;
    wrongTopics.clear();
    summaryText.innerHTML = "";
    showQuestion();
  } catch (err) {
    alert("❌ Failed to load quiz: " + err.message);
  }
}

function clearFeedback() {
  const feedbackContainer = document.getElementById("feedbackDiv");
  if (feedbackContainer) feedbackContainer.remove();
  const followUpFeedback = document.getElementById("followUpFeedback");
  if (followUpFeedback) followUpFeedback.remove();
}

function showQuestion() {
  clearFeedback();

  if (currentIndex >= quizData.length) {
    showScorePage();
    return;
  }
  const q = quizData[currentIndex];
  // Initialize hintUsed as false for each new question
  q.hintUsed = false;

  questionText.textContent = q.question;
  optionsDiv.innerHTML = "";
  optionsDiv.style.pointerEvents = "auto";
  hintBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
  hint.style.display = "none";
  hint.textContent = q.hint || "";
  const followUpDiv = document.getElementById("followUpDiv");
  if (followUpDiv) followUpDiv.remove();

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleMainAnswer(idx, q);
    optionsDiv.appendChild(btn);
  });
}

function showScorePage() {
  questionArea.style.display = "none";
  scorePage.style.display = "block";
  finalScoreText.textContent = `Your final score is ${correctAnswers} out of ${totalQuestions}.`;
  const oldBtns = scorePage.querySelectorAll("button");
  oldBtns.forEach((btn) => btn.remove());

  // Clear previous study content
  document.getElementById("studyContent").innerHTML = "";

  if (wrongTopics.size > 0) {
    let html = `<div><strong>You need more practice on the following topics:</strong></div>`;
    Array.from(wrongTopics).forEach((topic) => {
      let allFeedbacks = quizData
        .filter((q) => q.topic === topic && wrongTopics.has(topic))
        .map((q) => q.feedback || q.rationale || "")
        .filter(Boolean);

      let combinedFeedback = [...new Set(allFeedbacks)].join(" ");
      if (!combinedFeedback) combinedFeedback = "No specific feedback available.";

      html += `<div style='border:1px solid #ccc;margin:10px 0;padding:8px'>
        <strong>${topic}</strong><br/>
        <span style="color:#b00;font-weight:normal;">${combinedFeedback}</span>
      </div>`;
    });
    summaryText.innerHTML = html;

    // Show loading text while fetching study material
    document.getElementById("studyContent").innerHTML = "<em>Loading study material...</em>";

    const topic = exerciseSelect.value;
    fetchStudyMaterial(topic).then(study => {
      if (!study) {
        document.getElementById("studyContent").innerHTML = "<em>Failed to load study material.</em>";
        return;
      }
      let contentHtml = `<div style="background:#e3f2fd; border:1px solid #90caf9; padding:12px; border-radius:8px; margin-top: 12px;">
        <h3>Study Guide:</h3>
        <p>${study.studyGuide}</p>
        <h3>Examples:</h3>
      `;
      study.examples.forEach((ex, i) => {
        contentHtml += `<div style="margin-bottom:10px; background:#fff; padding:8px; border-radius:5px; border:1px solid #64b5f6;">
          <b>Example ${i+1}:</b><br>${ex.sentence}<br><i>${ex.explanation}</i>
        </div>`;
      });
      contentHtml += `</div>`;
      document.getElementById("studyContent").innerHTML = contentHtml;
    });

    const remedialBtn = document.createElement("button");
    remedialBtn.textContent = "Practice This Topic Again";
    remedialBtn.onclick = async () => {
      scorePage.style.display = "none";
      questionArea.style.display = "block";
      await loadQuiz(exerciseSelect.value, true);
    };
    scorePage.appendChild(remedialBtn);

  } else if (!isSATLevel) {
    summaryText.textContent =
      "🎉 Perfect! You're ready for SAT-level practice! Click the button below to continue.";
    document.getElementById("studyContent").innerHTML = "";
    const satBtn = document.createElement("button");
    satBtn.textContent = "Start SAT-Level Quiz";
    satBtn.onclick = async () => {
      isSATLevel = true;
      scorePage.style.display = "none";
      questionArea.style.display = "block";
      await loadQuiz(exerciseSelect.value);
    };
    scorePage.appendChild(satBtn);
  } else {
    summaryText.textContent =
      "🎉 Congratulations! You have mastered this topic! You can now start a new quiz.";
    document.getElementById("studyContent").innerHTML = "";
    const newQuizBtn = document.createElement("button");
    newQuizBtn.textContent = "Start New Quiz";
    newQuizBtn.onclick = () => {
      isSATLevel = false;
      startScreen.style.display = "block";
      quizScreen.style.display = "none";
      scorePage.style.display = "none";
    };
    scorePage.appendChild(newQuizBtn);
  }
}

function handleMainAnswer(selectedIdx, currentQuestion) {
  optionsDiv.style.pointerEvents = "none";
  hintBtn.style.display = "none";

  clearFeedback();

  const correctIdx = ["A", "B", "C", "D"].indexOf(currentQuestion.answer.trim()[0]);
  const isCorrect = selectedIdx === correctIdx;
  const score = isCorrect ? 1 : 0;

  const feedbackContainer = document.createElement("div");
  feedbackContainer.id = "feedbackDiv";
  feedbackContainer.style.marginTop = "10px";

  if (isCorrect) {
    feedbackContainer.innerHTML = `<span style="color:green;font-weight:bold;">✅ Correct!</span>`;
    correctAnswers++;
  } else {
    feedbackContainer.innerHTML = `<span style="color:red;font-weight:bold;">❌ Incorrect!</span> <span style="color:#222;">The correct answer is <strong>${currentQuestion.answer}</strong>.</span>`;
    wrongTopics.add(currentQuestion.topic || exerciseSelect.value);
    currentQuestion.isWrong = true;
    currentQuestion.selectedOption = currentQuestion.options[selectedIdx];
  }

  if (currentQuestion.rationale) {
    feedbackContainer.innerHTML += `<br><strong>Explanation:</strong> ${currentQuestion.rationale}`;
  }
  questionArea.appendChild(feedbackContainer);

  // Log question with proper hintUsed tracking
  const questionLogEntry = {
    question: currentQuestion.question,
    correctAnswer: currentQuestion.answer,
    userAnswer: currentQuestion.options[selectedIdx],
    isCorrect: isCorrect,
    score: score,
    hintUsed: currentQuestion.hintUsed ? "YES" : "NO" // Convert boolean to string here
  };

  logQuestion(userEmail, exerciseSelect.value, questionLogEntry);

  if (currentQuestion.followUp) {
    showFollowUpQuestion(currentQuestion.followUp, currentQuestion.rationale);
  } else {
    nextBtn.style.display = "inline-block";
  }
}

function showFollowUpQuestion(followUp, mainRationale) {
  const oldOptions = document.getElementById("options");
  const followUpDiv = document.createElement("div");
  followUpDiv.id = "followUpDiv";
  followUpDiv.style.marginTop = "20px";
  followUpDiv.innerHTML = mainRationale
    ? `<strong>Rationale:</strong> ${mainRationale}`
    : "";

  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<strong>Follow-up:</strong> ${followUp.question}`;
  followUpDiv.appendChild(qDiv);

  const followUpOptionsDiv = document.createElement("div");
  followUpOptionsDiv.id = "followup-options";
  followUpOptionsDiv.style.marginTop = "10px";
  followUp.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleFollowUpAnswer(idx, followUp);
    followUpOptionsDiv.appendChild(btn);
  });
  followUpDiv.appendChild(followUpOptionsDiv);

  const followUpFeedback = document.createElement("div");
  followUpFeedback.id = "followUpFeedback";
  followUpFeedback.style.marginTop = "10px";
  followUpDiv.appendChild(followUpFeedback);

  questionArea.appendChild(followUpDiv);
  oldOptions.style.display = "none";
}

function handleFollowUpAnswer(selectedIdx, followUp) {
  const followUpOptionsDiv = document.getElementById("followup-options");
  followUpOptionsDiv.style.pointerEvents = "none";
  const correctIdx = ["A", "B", "C", "D"].indexOf(followUp.answer.trim()[0]);
  const isCorrect = selectedIdx === correctIdx;

  const followUpFeedback = document.getElementById("followUpFeedback");
  if (isCorrect) {
    followUpFeedback.innerHTML = `<span style="color:green;font-weight:bold;">✅ Correctly answered follow-up!</span>`;
  } else {
    followUpFeedback.innerHTML = `<span style="color:red;font-weight:bold;">❌ Incorrect follow-up answer!</span> <span style="color:#222;">The correct answer is <strong>${followUp.answer}</strong>.</span>`;
  }

  nextBtn.style.display = "inline-block";
}

hintBtn.addEventListener("click", () => {
  // Mark hint as used for the current question
  const currentQuestion = quizData[currentIndex];
  if (currentQuestion) {
    currentQuestion.hintUsed = true; // Set to true when hint button is clicked
  }
  hint.textContent = currentQuestion.hint;
  hint.style.display = "block";
});

nextBtn.addEventListener("click", () => {
  const followUpDiv = document.getElementById("followUpDiv");
  if (followUpDiv) followUpDiv.remove();
  clearFeedback();
  const oldOptions = document.getElementById("options");
  oldOptions.style.display = "block";
  currentIndex++;
  showQuestion();
});