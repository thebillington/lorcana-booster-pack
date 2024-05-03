interface Card {
    images: { full: string };
    name: string;
  }

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
      
        container.innerHTML = '';
      
        cards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');
      
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
}

(window as any).boosterpage = new BoosterPackPage();