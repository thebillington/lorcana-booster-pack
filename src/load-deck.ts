interface Card {
  images: { full: string };
  name: string;
  color: string;
}

const inkImages: { [id: string]: string } = {
  'amber': require('./images/inks/amber.png'),
  'emerald': require('./images/inks/emerald.png'),
  'ruby': require('./images/inks/ruby.png'),
  'sapphire': require('./images/inks/sapphire.png'),
  'steel': require('./images/inks/steel.png'),
  'amethyst': require('./images/inks/amethyst.png')
};

export class DeckPage {
  public loadDeckFromBase64(encodedString: string): void {
    this.fetchData(encodedString)
      .then((cards) => {
        this.renderCards(cards);
        this.updateCardRules(cards)
      })
      .catch(error => {
        console.error('Error fetching and rendering data:', error);
      });
  }

  private async fetchData(encodedDeck: string): Promise<Card[]> {
    try {
      const response = await fetch(`/api/deck?encodedString=${encodedDeck}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  private async renderCards(cards: Card[]): Promise<void> {
    const container = document.getElementById('deck');
    if (!container) {
      console.error('Container not found');
      return;
    }

    container.innerHTML = '';

    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.classList.add('deck-card');

      const imageElement = document.createElement('img');
      imageElement.src = card.images.full;
      imageElement.alt = card.name;

      const nameElement = document.createElement('p');
      nameElement.textContent = card.name;

      cardElement.appendChild(imageElement);
      cardElement.appendChild(nameElement);

      container.appendChild(cardElement);
    });
  }

  private updateCardRules(cards: Card[]): void {
    const imageContainer = document.getElementsByClassName('ink-token') as HTMLCollectionOf<HTMLImageElement>;
    if (!imageContainer) return

    const inks: string[] = this.getInks(cards);
    for (var i = 0; i < inks.length; i++) {
      imageContainer[i].src = inkImages[inks[i].toLowerCase()];
      imageContainer[i].setAttribute('ink', inks[i].toLowerCase());
    }
  }

  private getInks(cards: Card[]): string[] {
    const inks: string[] = [];
    cards.forEach((card: Card) => {
      if (inks.indexOf(card.color) == -1) {
        inks.push(card.color);
      }
    });

    return inks
  }
}

(window as any).deckpage = new DeckPage();