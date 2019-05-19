package recursion;

import java.util.Scanner;

public class SumOfGP {
	static double sum;

	public static double findGeometricSum(int r, int k) {
		// Write your code here
		if (k == 0) {
			sum = sum + 1;
			return sum;
		}
		// System.out.print(power(r, k));
		sum = sum + 1 / power(r, k);
		findGeometricSum(r, k - 1);
		return sum;

	}

	public static double power(int n, int k) {
		if (k == 0) {
			return 1;
		}
		return n * power(n, k - 1);
	}

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		System.out.print("Enter the number of terms:");
		int n = in.nextInt();
		System.out.print("Enter the common ratio(in 1/value):");
		int r = in.nextInt();
		double sum = findGeometricSum(r, n);
		System.out.println(sum);
	}

}
