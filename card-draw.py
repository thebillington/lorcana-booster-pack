import json

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
                card["willpower"] if "willpower" in card else 0
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
                 willpower):
        
        self.colour = colour
        self.inkable = inkable
        self.name = name
        self.subtitle = subtitle
        self.rarity = rarity
        self.cost = cost
        self.lore = lore
        self.strength = strength
        self.willpower = willpower

    def __str__(self):
        subtitle = f", subtitle:{self.subtitle})" if self.subtitle != "none" else ""
        return f"Card(name:{self.name}{subtitle}"
    
    def __repr__(self):
        return self.__str__()

if __name__ == "__main__":
    card_data = filter_card_data(
        fetch_card_data("card-data.json")
    )

    print(card_data)