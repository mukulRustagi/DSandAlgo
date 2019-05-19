package recursion;

public class PrintNumber {
	// static int i=1;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int n = 10;
		print(n);

	}

	public static void print(int n) {
		if (n == 1) {
			System.out.print(n + " ");
			return;
		}
		print(n - 1);
		System.out.print(n + " ");
		return;
	}

}

//
// public static void print(int n){
// if(i > n){
// return;
// }
// System.out.print(i+" ");
// i++;
// print(n);
// }
