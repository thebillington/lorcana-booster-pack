import {Card} from './models/card';

export class Stats {
  
  private static countCardsByCost(cards: Card[]) {
    const costCount: Record<number, number> = {};
    cards.map(card => card.cost).forEach(cost => {
      costCount[cost] = (costCount[cost] || 0) + 1;
    });
    return costCount;
  }
  
  static drawCostGraph(cards: Card[]) {

    const cardCurveValues: Record<number, number> = this.countCardsByCost(cards);

    const canvas = document.getElementById('deck-curve') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = 30;
    const spacing = 10;
    let x = 10;
    for (const cost in cardCurveValues) {
      const count = cardCurveValues[cost];
      const barHeight = count * 10;
      ctx.fillStyle = 'blue';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      ctx.fillStyle = 'black';
      const textX = x + barWidth / 2;
      const textY = canvas.height - barHeight - 5;
      ctx.textAlign = "center";
      ctx.fillText(count.toString(), textX, textY);
      ctx.fillText(cost, textX, 20);
      x += barWidth + spacing;
    }
  }
}