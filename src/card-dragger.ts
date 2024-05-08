import { BoosterPack } from "./booster-pack";
import { DeckPage } from "./load-deck";

export class CardDragger {
    private dragSource : any;
    private draggingClass: string = "dragging";

    private cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card');
    private columns: NodeListOf<HTMLElement> = document.querySelectorAll('.card-container');

    public setDraggable() {
        this.cards.forEach((col: HTMLElement) => {
            col.addEventListener('dragstart', this.handleDragStart.bind(this), false);
            col.addEventListener('dragover', this.handleDragOver.bind(this), false);
            col.addEventListener('dragend', this.handleDragEnd.bind(this), false);
        });

        this.columns.forEach((col: HTMLElement) => {
            col.addEventListener('dragenter', this.handleDragEnter.bind(this), false);
            col.addEventListener('dragover', this.handleDragOver.bind(this), false);
            col.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
            col.addEventListener('dragend', this.handleDragEnd.bind(this), false);
            col.addEventListener('drop', this.handleDrop.bind(this), false);
        });

    }

    private handleDragStart(event: DragEvent) : void {
        this.dragSource = event.currentTarget as HTMLElement;
        this.dragSource.classList.add(this.draggingClass);
        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer!.setData('text/html', this.dragSource.innerHTML); 
    }

    private handleDragOver(event: DragEvent): void {
        event.dataTransfer!.dropEffect = 'move';
        event.preventDefault();
    }

    private handleDragEnter(event: DragEvent): void {
        event.preventDefault();

        const targetElement = event.target as HTMLElement
        if(targetElement.closest('.card-container')) {
            targetElement.classList.add('over');
        }
    }

    private handleDragLeave(event: DragEvent): void {
        const relatedTarget = event.relatedTarget as HTMLElement;
        const closestContainer = relatedTarget.closest('.card-container')
        if(!relatedTarget || !closestContainer) {
            closestContainer?.classList.remove('over');
        }
    }

    private handleDrop(event: DragEvent): void {
        event.stopPropagation();

        const deckpage = (window as any).deckpage as DeckPage;
        const boosterpage = (window as any).boosterPack as BoosterPack;
        const cardPosition = +this.dragSource.getAttribute("position");

        const target = event.target as HTMLElement;
        if(this.dragSource && this.dragSource !== target) {
            if (target.closest('.card-container')!.id == "deck") {
                const card = boosterpage.getCard(cardPosition);
                deckpage.insertCard(card, 0);
            }
        }

        event.preventDefault();
    }

    private handleDragEnd(event: DragEvent) {
        Array.prototype.forEach.call(this.cards, (col) => {
            ['over', 'dragging'].forEach(function (className) {
                col.classList.remove(className)
            });
        })

        Array.prototype.forEach.call(this.columns, (col) => {
            ['over', 'dragging'].forEach(function (className) {
                col.classList.remove(className)
            });
        })
    }


}