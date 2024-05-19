export class BinaryUtil {

    public static intToBinaryString( num: number, bits: number): string {
        return num.toString(2).padStart(bits, "0");
    }
}