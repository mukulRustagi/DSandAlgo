package recursion;
import java.util.Scanner;
public class Fibonnaci {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.print("Enter the number");
		Scanner s =new Scanner(System.in);
		int n =s.nextInt();
		int num =fibbo(n);
		System.out.println("num:"+num);

	}
	public static int fibbo(int n) {
		if(n==0||n==1) {
			return n;
		}
		return fibbo(n-1) +fibbo(n-2);
	}

}
