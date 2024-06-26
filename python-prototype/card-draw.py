import json
import random
import flask

def fetch_card_data(filename):
    with open(filename) as f:
        card_data = json.loads(f.read())
        return(card_data["cards"])
    
def filter_card_data(card_data):
    cards = {
        "common": [],
        "uncommon": [],
        "rare": [],
        "super": [],
        "legendary": [],
        "enchanted": [],
        "special": []
    }

    for card in card_data:

        cards[
            card["rarity"].lower()
        ].append(
            Card(
                card["color"],
                card["inkwell"],
                card["baseName"],
                card["subtitle"] if "subtitle" in card else "none",
                card["rarity"],
                card["cost"],
                card["lore"] if "lore" in card else 0,
                card["strength"] if "strength" in card else 0,
                card["willpower"] if "willpower" in card else 0,
                card["images"]["full"]
            )
        )

    return cards

class Card:

    def __init__(self,
                 colour,
                 inkable,
                 name,
                 subtitle,
                 rarity,
                 cost,
                 lore,
                 strength,
                 willpower,
                 image_url):
        
        self.colour = colour
        self.inkable = inkable
        self.name = name.replace("\'", '')
        self.subtitle = subtitle.replace("\'", '')
        self.rarity = rarity
        self.cost = cost
        self.lore = lore
        self.strength = strength
        self.willpower = willpower
        self.image_url = image_url
        self.foil = False

    def __str__(self):
        subtitle = f", subtitle:{self.subtitle}" if self.subtitle != "none" else ""
        return f"Card(name:{self.name}{subtitle}, colour: {self.colour}, rarity: {self.rarity})"
    
    def __repr__(self):
        return self.__str__()
    
def pull_booster_pack(card_data):
    cards = []

    # Pull 6 common cards
    for i in range(6):
        cards.append(random.choice(card_data["common"]))

    # Pull 3 uncommon cards
    for i in range(3):
        cards.append(random.choice(card_data["uncommon"]))

    # Pull 2 random cards from rare, super, legendary
    # https://www.digitaltq.com/the-first-chapter-pull-rates-disney-lorcana-tcg
    odds_selector = []
    for i in range(135): odds_selector.append("rare")
    for i in range(48): odds_selector.append("super")
    for i in range(17): odds_selector.append("legendary")

    for i in range(2):
        cards.append(random.choice(card_data[random.choice(odds_selector)]))

    # Pull a random card, from a random deck, of any type
    # https://www.digitaltq.com/the-first-chapter-pull-rates-disney-lorcana-tcg
    foil_odds_selector = []
    for i in range(125): foil_odds_selector.append("common")
    for i in range(50): foil_odds_selector.append("uncommon")
    for i in range(14): foil_odds_selector.append("rare")
    for i in range(8): foil_odds_selector.append("super")
    for i in range(2): foil_odds_selector.append("legendary")
    for i in range(1): foil_odds_selector.append("enchanted")
    card = random.choice(card_data[random.choice(foil_odds_selector)])
    card.foil = True
    cards.append(card)

    return cards

app = flask.Flask(__name__)

@app.route('/')
def card_pull():

    card_data = filter_card_data(
        fetch_card_data("card-data.json")
    )

    booster = pull_booster_pack(card_data)

    return f'''
<html>
    <head>
    </head>

    <style>
    .shimmer {{
        color: grey;
        display:inline-block;
        -webkit-mask:linear-gradient(-60deg,#000 30%,#0005,#000 70%) right/300% 100%;
        background-repeat: no-repeat;
        animation: shimmer 2s infinite;
    }}

    @keyframes shimmer {{
        100% {{-webkit-mask-position:left}}
    }}
    </style>

    <script>
        document.addEventListener("DOMContentLoaded", () => {{
            booster = JSON.parse('{json.dumps(booster, default=vars)}').reverse();
            const pullBooster = () => {{
                card = booster.pop();
                document.getElementById("card").src = card.image_url;
                if (card.foil)
                    document.getElementById("card").classList.add("shimmer");
                if (booster.length > 0)
                    window.setTimeout(pullBooster, 1000);
            }}
            pullBooster();
        }});
    </script>
    
    <body style="display: flex; justify-content: center;">
        <img id="card" style="height: 500px; width: auto; position: absolute; margin-top: 10%;"></img>
    </body>
</html>
'''

if __name__ == "__main__":
    app.run(port=8000)