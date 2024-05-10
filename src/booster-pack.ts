import { CardDragger } from './card-dragger';
import { Card } from './models/card';

export class BoosterPack {
    private cards: Card[] = [];
    private selectedCard = -1;

    public getBoosterPack(): void {
        this.fetchData()
            .then((cards) => {
                this.cards = cards;
                this.renderCards(cards);
                const container = document.getElementById('export-deck-button');
                if (!container) return;
                container.style.display = "inline-block";
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

        cards.forEach((card, i) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.classList.add('booster-card');
            cardElement.setAttribute("position", i.toString());
            const imageElement = document.createElement('img');
            imageElement.src = card.images.full;
            imageElement.alt = card.fullName;

            if (inksInDeck.length == 2) {
                if (inksInDeck.indexOf(card.color.toLowerCase()) == -1) {
                    cardElement.classList.add('disabled-card');
                    cardElement.draggable = false;
                } else {
                    cardElement.draggable = true;
                    if (i == this.selectedCard) imageElement.classList.add('selected');
                }
            }

            const nameElement = document.createElement('p');
            nameElement.textContent = card.fullName;

            cardElement.appendChild(imageElement);
            cardElement.appendChild(nameElement);

            container.appendChild(cardElement);
        });
        const cardDragger = (window as any).cardDragger as CardDragger;
        cardDragger.setupDragging();
    }

    private getInks(): string[] {
        const imageContainer = Array.from(document.getElementsByClassName('ink-token'));
        const inks: string[] = [];
        imageContainer.forEach(img => {
            inks.push(img.getAttribute("ink") as string);
        });

        return inks;
    }

    public insertCard(card: Card, position: number) {
        this.cards.push(card);
        this.renderCards(this.cards);
    }

    public getCard(position: number): Card {
        const card = this.cards[position];
        return card;
    }

    public removeCard(positon: number) {
        this.cards.splice(positon, 1);
        this.renderCards(this.cards);
    }
}

(window as any).boosterPack = new BoosterPack();