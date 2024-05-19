const hexLookup = {
    "0000": "0",
    "0001": "1",
    "0010": "2",
    "0011": "3",
    "0100": "4",
    "0101": "5",
    "0110": "6",
    "0111": "7",
    "1000": "8",
    "1001": "9",
    "1010": "A",
    "1011": "B",
    "1100": "C",
    "1101": "D",
    "1110": "E",
    "1111": "F"
}

export class BinaryUtil {

    public static intToBinaryString( num: number, bits: number): string {
        return num.toString(2).padStart(bits, "0");
    }

    public static binToHex( binaryString: string): string {
        let hexString = "";
        for (var i = 0; i < binaryString.length; i += 4) {
            hexString += hexLookup[binaryString.substring(i, i + 4) as string];
        }
        return hexString;
    }
}