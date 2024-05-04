interface Card {
  images: { full: string };
  name: string;
  color: string;
}

export class BoosterPackPage {

  public cards: Card[] = [];
  public selectedCard = -1;

  public getBoosterPack(): void {
    this.fetchData()
      .then((cards) => {
        this.cards = cards;
        this.renderCards(cards)
      })
      .catch(error => {
        console.error('Error fetching and rendering data:', error);
      });
  }

  private async fetchData(): Promise<Card[]> {
    try {
      const response = await fetch('/api/booster');
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
    const container = document.getElementById('booster-pack');
    if (!container) {
      console.error('Container not found');
      return;
    }

    const inksInDeck = this.getInks();

    container.innerHTML = '';

    cards.forEach( (card, i) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.classList.add('booster-card');

      cardElement.setAttribute("onclick", `boosterpage.selectCard(${i})`);

      const imageElement = document.createElement('img');
      imageElement.src = card.images.full;
      imageElement.alt = card.name;

      if (inksInDeck.length == 2) {
        if (inksInDeck.indexOf(card.color.toLowerCase()) == -1) {
          cardElement.classList.add('disabled-card');
        } else {
          if (i == this.selectedCard) imageElement.classList.add('selected');
        }
      }

      const nameElement = document.createElement('p');
      nameElement.textContent = card.name;

      cardElement.appendChild(imageElement);
      cardElement.appendChild(nameElement);

      container.appendChild(cardElement);
    });
  }

  private getInks(): string[] {
    const imageContainer = Array.from(document.getElementsByClassName('ink-token'));
    const inks: string[] = [];
    imageContainer.forEach( img => {
      inks.push(img.getAttribute("ink") as string);
    });
    
    return inks;
  }

  private selectCard(position: number) {
    if (this.selectedCard == position) {
      this.selectedCard = -1;
    } else {
      this.selectedCard = position;
    }
    console.log("HERE");
    this.renderCards(this.cards);
  }
}

(window as any).boosterpage = new BoosterPackPage();