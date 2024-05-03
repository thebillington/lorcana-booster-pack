import {Card} from './models/card';
export class BoosterPackPage {
  public getBoosterPack(): void {
    this.fetchData()
      .then((result) => {
        console.log(result);
        this.renderCards(result)
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

    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.classList.add('booster-card');

      if (inksInDeck.length == 2) {
        if (inksInDeck.indexOf(card.color.toLowerCase()) == -1) {
          cardElement.classList.add('disabled-card');
        }
      }

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

  private getInks(): string[] {
    const imageContainer = Array.from(document.getElementsByClassName('ink-token'));
    const inks: string[] = [];
    imageContainer.forEach( img => {
      inks.push(img.getAttribute("ink") as string);
    });
    
    return inks;
  }
}

(window as any).boosterpage = new BoosterPackPage();