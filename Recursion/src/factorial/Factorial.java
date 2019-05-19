package factorial;
import java.util.Scanner;

public class Factorial {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner in = new Scanner(System.in);
		System.out.print("Enter the number: ");
		int n = in.nextInt();
		Factorial f=new Factorial();
		int factorial =f.fact(n);
		System.out.print("Factorial is: "+ factorial);
		
	}
	
	public int fact(int n) {
		if(n==0) {
			return 1;
		}
			
			return n* fact(n-1);
	}
		
		
		
	}
	

