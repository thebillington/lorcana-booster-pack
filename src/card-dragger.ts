import { Card } from './models/card';
import { DeckPage } from './load-deck';
import { BoosterPack } from './booster-pack';

export class CardDragger {
    private draggedCard: [number, Card] | undefined;
    private deckPage: DeckPage;
    private boosterPack: BoosterPack;

    constructor() {
        this.deckPage = (window as any).deckpage as DeckPage;
        this.boosterPack = (window as any).boosterPack as BoosterPack;
    }

    setupDragging() {
        const cardElements = document.querySelectorAll('.card') as NodeListOf<HTMLElement>;

        cardElements.forEach(cardElement => {
            const isCardDraggable = cardElement.draggable === true;
            cardElement.addEventListener('dragstart', this.handleDragStart.bind(this), false);
            cardElement.addEventListener('dragend', () => this.handleDragEnd());

            const images = cardElement.querySelectorAll('img');
            images.forEach(img => {
                if (!isCardDraggable) {
                    img.addEventListener('dragstart', (event) => event.preventDefault());
                }
            });
        });
    }

    private handleDragStart(event: DragEvent) {
        const cardElement = this.findCardElement(event.target as HTMLElement);
        if (!cardElement) return;

        const position = parseInt(cardElement.getAttribute('position') || '0');
        this.draggedCard = [position, this.boosterPack.getCard(position)];
    }

    private handleDragEnd() {
        this.draggedCard = undefined;
    }

    public handleDropIntoDeck(event: DragEvent) {
        event.preventDefault();
        if (!this.draggedCard) return;
        this.deckPage.insertCard(this.draggedCard[1]!);
        this.boosterPack.removeCard(this.draggedCard[0]!);
    }

    private findCardElement(element: HTMLElement | null): HTMLElement | null {
        while (element && !element.classList.contains('card')) {
            element = element.parentElement;
        }
        return element;
    }
}

(window as any).cardDragger = new CardDragger();