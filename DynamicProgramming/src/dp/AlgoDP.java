package dp;

public class AlgoDP {

	public static void main(String[] args) {
		long out = staircase(4);
		System.out.println(out);
	}

	public static int countStepsTo1(int n) {
		int storage[] = new int[n + 1];
		storage[1] = 0;
		for (int i = 2; i < n; i++) {
			int min = storage[i - 1];
			if (i % 3 == 0) {
				if (min > storage[i / 3]) {
					min = storage[i / 3];
				}
			}
			if (i % 2 == 0) {
				if (min > storage[i / 2]) {
					min = storage[i / 2];
				}
			}
			storage[i] = i + min;

		}
		return storage[n];

	}
//################################################################################################
	/*
	 * Question, Code: Staircase Send Feedback A child is running up a staircase
	 * with n steps and can hop either 1 step, 2 steps or 3 steps at a time.
	 * Implement a method to count how many possible ways the child can run up to
	 * the stairs. You need to return all possible number of ways. Time complexity
	 * of your code should be O(n). Input format : Integer n (No. of steps)
	 * Constraints : n <= 70 Sample Input 1: 4 Sample Output 1: 7
	 * 
	 * 
	 */

	/*
	 * explanation: it is Dynamic Porgramming code, bottom to top apporach (like as
	 * we know from n-3 for 3 takes 1 step if (n=3) hence we define if (n==0) return
	 * 1, and if (n==1) ofcourse it takes 1 step as n -1 =0 (if n=1). and if look
	 * n=2 then we can reach by two ways as -1 or by -2.
	 */
	public static long staircase(int n) {

		/*
		 * Your class should be named Solution. Don't write main() function. Don't read
		 * input, it is passed as function argument. Return output and don't print it.
		 * Taking input and printing output is handled automatically.
		 */
		long ways[] = new long[n + 1];
		if (n == 0) {
			return 1;
		}
		if (n == 1) {
			return 1;
		}
		if (n == 2) {
			return 2;
		}
		ways[0] = 1;
		ways[1] = 1;
		ways[2] = 2;
		for (int i = 3; i <= n; i++) {
			ways[i] = ways[i - 1] + ways[i - 2] + ways[i - 3];
		}
		return ways[n];
	}
	// ############################################################################################
	/*
	 * Code: Minimum Count of Squares Send Feedback Given an integer N, find and
	 * return the count of minimum numbers, sum of whose squares is equal to N. That
	 * is, if N is 4, then we can represent it as : {1^2 + 1^2 + 1^2 + 1^2} and
	 * {2^2}. Output will be 1, as 1 is the minimum count of numbers required. Note
	 * : x^y represents x raise to the power y. Input Format : Integer N Output
	 * Format : Required minimum count Constraints : 1 <= N <= 1000 Sample Input 1 :
	 * 12 Sample Output 1 : 3 Sample Output 1 Explanation : 12 can be represented as
	 * : 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 1^1 +
	 * 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 1^1 + 2^2 1^1 + 1^1 + 1^1 + 1^1 + 2^2 +
	 * 2^2 2^2 + 2^2 + 2^2 As we can see, the output should be 3. Sample Input 2 : 9
	 * Sample Output 2 : 1
	 */

	// using dp, it could be done using recursion also.

	public static int minCount(int n) {
		if (n <= 3) {
			return n;
		}
		int count[] = new int[n + 1];
		count[0] = 0;
		count[1] = 1;
		count[2] = 2;
		count[3] = 3;
		for (int i = 4; i <= n; i++) {
			int ans = i;
			for (int j = 1; j <= i / 2; j++) {
				int k = i - (j * j);
				if (k >= 0) {
					ans = Math.min(ans, count[k] + 1);
				}
			}
			count[i] = ans;
		}
		return count[n];
	}
	// ############################################################################################
	/*
	 * Given an integer h, find the possible number of balanced binary trees of
	 * height h. You just need to return the count of possible binary trees which
	 * are balanced. This number can be huge, so return output modulus 10^9 + 7.
	 * Write a simple recursive solution. Input Format : Integer h Output Format :
	 * Count % 10^9 + 7 Input Constraints : 1 <= h <= 40 Sample Input 1: 3 Sample
	 * Output 1: 15 Sample Input 2: 4 Sample Output 2: 315
	 */

	public static int balancedTreesOfHeightH(int height) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Return output and don't print it. Taking
		 * input and printing output is handled automatically.
		 */
		if (height <= 1) {
			return 1;
		}
		int mod = (int) (Math.pow(10, 9) + 7);
		int x = balancedTreesOfHeightH(height - 1);
		int y = balancedTreesOfHeightH(height - 2);

		int temp1 = (int) (((long) (x) * x) % mod);
		int temp2 = (int) ((2 * (long) (x) * y) % mod);
		int ans = (temp1 + temp2) % mod;
		return ans;

	}

}
