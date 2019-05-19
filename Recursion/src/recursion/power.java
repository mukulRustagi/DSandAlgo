package recursion;
import java.util.Scanner;
public class power {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s= new Scanner(System.in);
		System.out.print("Enter the x:");
		int x= s.nextInt();
		System.out.print("Enter the n:");
		int n =s.nextInt();
		int pow =pow(x,n);
		System.out.print(pow);

}
	
	public static int pow(int x,int n) {
		if(n==0) {
			return 1;
		}
		return x* pow(x,n-1);
	}

}
