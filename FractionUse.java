public class FractionUse {

    public static void main(String[] args) {
        Fraction f1 = new Fraction(28, 30);
        f1.print();
    }
}

class Fraction {
    private int numerator;
    private int denominator;

    Fraction(int numerator, int denominator) {
        this.numerator = numerator;
        if(denominator==0){
            //todo er
        }
        this.denominator = denominator;
        simplify();
    }
    private void simplify(){
        int gcd=1;
        int smaller =Math.min(numerator, denominator);
        for(int i=2;i<=smaller;i++){
            if(numerator%i==0 && denominator%i==0){
                gcd=i;
            }
        }
        numerator=numerator/gcd;
        denominator=denominator/gcd;
    }
    public void print(){
     if(denominator==1){
         System.out.println(numerator);
     }
     else{
         System.out.println(numerator+" / "+denominator);
     }
    }

}