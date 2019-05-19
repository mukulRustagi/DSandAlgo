package FractionFinal;

public class Fraction {
	private int numerator;
	private int denominator;
	
	public Fraction(int numerator, int denominator){
		this.numerator=numerator;
		if(denominator==0) {
			//todo Error
		}
		else {
			this.denominator=denominator;
		}
		
		simplify();
	}
	
	private void simplify() {
		int gcd=1;
		int smaller = Math.min(numerator, denominator);
		for(int i=2; i<smaller;i++) {
			if(numerator/i == 0 && denominator/i == 0) {
				gcd =i;
			}
		}
		numerator= numerator/gcd;
		denominator=denominator/gcd;
	}
	
	 public void print() {
		System.out.println(numerator+"/"+denominator);
	}
	
	public void setNumerator(int n) {
     numerator=n;
     }
}
