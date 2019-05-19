package recursion;
import java.util.Scanner;
public class NumberOfDigits {
	static int i=10;
	static int no;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s= new Scanner(System.in);
		System.out.print("Enter the digit");
		int digit= s.nextInt();
		int number=number(digit);
		System.out.print(number);
		
	}
	
	public static int number(int digit) {
		int q=digit/i;
		if(q==0) {
			return no+1;
		}
		no++;
		i=i*10;
		return number(digit);
		}

}
