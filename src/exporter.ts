import { Card } from './models/card';
import { BinaryUtil } from './binary-util';

class Exporter {

    static countInstancesOfCards( deck: Card[] ): Record<number, number> {
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

export class PixelbornExporter extends Exporter {

    public static generateCode( deck: Card[] ): string {

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
}

const cardQuantityLookup = {
    1: "00",
    2: "01",
    3: "10",
    4: "11"
}

export class OptimisedExporter extends Exporter {

    public static generateCode( deck: Card[] ): string {

        let outputString: string = "";
        let completedCardIds: number[] = [];
        const count = this.countInstancesOfCards(deck);

        deck.forEach( card => {
            if (completedCardIds.indexOf(card.id) == -1) {
                outputString += BinaryUtil.intToBinaryString(card.number, 8) +
                    BinaryUtil.intToBinaryString(card.setNumber, 6) +
                        cardQuantityLookup[count[card.id]];
                completedCardIds.push(card.id);
            }
        });
        console.log(outputString);
        return btoa(outputString);
    }
}