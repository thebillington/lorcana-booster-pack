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
        console.log(this.dragSource);
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
        console.log(relatedTarget);
        const closestContainer = relatedTarget.closest('.card-container')
        console.log(closestContainer);
        if(!relatedTarget || !closestContainer) {
            closestContainer?.classList.remove('over');
        }
    }

    private handleDrop(event: DragEvent): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        if(this.dragSource && this.dragSource !== target) {
            target.closest('.card-container')!.appendChild(this.dragSource);
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