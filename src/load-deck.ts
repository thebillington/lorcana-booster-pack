import { Card } from './models/card';

import { BoosterPackPage } from './booster-page';
import { Stats } from './stats';
import { Exporter } from './exporter';

const inkImages: { [id: string]: string } = {
  'amber': require('./images/inks/amber.png'),
  'emerald': require('./images/inks/emerald.png'),
  'ruby': require('./images/inks/ruby.png'),
  'sapphire': require('./images/inks/sapphire.png'),
  'steel': require('./images/inks/steel.png'),
  'amethyst': require('./images/inks/amethyst.png')
};

export class DeckPage {
  
  public cards: Card[] = [];
  public selectedCard = -1;

  public loadDeckFromBase64(encodedString: string): void {
    this.fetchData(encodedString)
      .then((cards) => {
        this.cards = cards;
        this.renderCards(cards);
        this.updateCardRules(cards);
        Stats.drawCostGraph(cards);
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

    cards.forEach( (card, i) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.classList.add('deck-card');
      
      cardElement.setAttribute("onclick", `deckpage.selectCard(${i})`);

      const imageElement = document.createElement('img');
      imageElement.src = card.images.full;
      imageElement.alt = card.name;
      if (i == this.selectedCard) imageElement.classList.add('selected');

      const nameElement = document.createElement('p');
      nameElement.textContent = card.name;

      cardElement.appendChild(imageElement);
      cardElement.appendChild(nameElement);

      container.appendChild(cardElement);
    });
  }

  private updateCardRules(cards: Card[]): void {
    const imageContainer = document.getElementsByClassName('ink-token') as HTMLCollectionOf<HTMLImageElement>;
    if (!imageContainer) return;
    const inks: string[] = this.getInks(cards);
    for (var i = 0; i < inks.length; i++) {
      imageContainer[i].src = inkImages[inks[i].toLowerCase()];
      imageContainer[i].setAttribute('title', inks[i]);
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

    return inks;
  }

  private selectCard(position: number) {
    if (this.selectedCard == position) {
      this.selectedCard = -1;
    } else {
      this.selectedCard = position;
    }
    this.renderCards(this.cards);

    const boosterpage = (window as any).boosterpage as BoosterPackPage;
    if (boosterpage.getSelectedCard() != -1) {
      const cardToSwap = boosterpage.swapCard(this.cards[this.selectedCard]);
      this.cards[this.selectedCard] = cardToSwap;
      this.selectedCard = -1;
      this.renderCards(this.cards);
    }
  }

  public getSelectedCard(): number {
    return this.selectedCard;
  }

  public swapCard(card: Card): Card {
    const cardToReturn = this.cards[this.selectedCard];
    this.cards[this.selectedCard] = card;
    this.selectedCard = -1;
    this.renderCards(this.cards);
    return cardToReturn;
  }

  public exportDeck() {
    const exportCode: string = Exporter.generatePixelbornImportCode(this.cards);

    const container = document.getElementById('export-window') as HTMLDivElement;
    const textbox = document.getElementById('pixelborn-code') as HTMLTextAreaElement;
    if (!container || !textbox) {
      console.error('Container not found');
      return;
    }

    textbox.value = exportCode;
    container.style.display = 'block';
  }

  public closeExportWindow() {
    const container = document.getElementById('export-window') as HTMLDivElement;
    if (!container) {
      console.error('Container not found');
      return;
    }
    container.style.display = 'none';
  }
}

(window as any).deckpage = new DeckPage();