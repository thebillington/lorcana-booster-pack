import {Card} from './models/card';

export class Exporter {

    public static generatePixelbornImportCode( deck: Card[] ): string {

        let outputString: string = "";
        let completedCardIds: number[] = [];
        const count = this.countInstancesOfCards(deck);

        deck.forEach( card => {
            if (completedCardIds.indexOf(card.id) == -1) {
                if (card.type == "Character" || card.type == "Location") {
                    outputString += `${card.baseName}_${card.subtitle}$${count[card.id]}|`;
                } else {
                    outputString += `${card.baseName}$${count[card.id]}|`
                }
                completedCardIds.push(card.id);
            }
        });

        return btoa(outputString);
    }

    private static countInstancesOfCards( deck: Card[] ): Record<number, number> {
        let count: Record<number, number> = {};
        deck.forEach( card => {
            if (card.id in count) {
                count[card.id] += 1;
            } else {
                count[card.id] = 1;
            }
        });
        return count;
    }
    
}