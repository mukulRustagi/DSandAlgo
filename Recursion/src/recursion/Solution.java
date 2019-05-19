package recursion;

public class Solution {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// String s="abcddefgfhgsfa";
		// String t="abcd";
		int ar[] = { 30, 20, 53, 14 };
		int profit = maximumProfit(ar);
		System.out.print(profit);

	}

	public static int maximumProfit(int budget[]) {
		// Write your code here
		budget = sort(budget);
		int cost[] = new int[budget.length];
		for (int i = 0; i < budget.length; i++) {
			cost[i] = budget[i] * (budget.length - i);
		}
		int max = Integer.MIN_VALUE;
		for (int i : cost) {
			if (i > max)
				max = i;
		}
		return max;

	}

	public static int[] sort(int ar[]) {
		for (int j = 0; j < ar.length; j++) {

			for (int i = 0; i < ar.length - j - 1; i++) {
				if (ar[i] > ar[i + 1]) {
					int temp;
					temp = ar[i];
					ar[i] = ar[i + 1];
					ar[i + 1] = temp;
				}
			}

		}

		return ar;
	}
}

// public static int maximumProfit(int budget[]) {
// // Write your code here
// int sorted[] = sort(budget);
// int sum = 0;
// for (int i = 0; i < sorted.length; i++) {
// sum += sorted[i];
// }
// int x = 0;
// int index = 0;
// int avg = sum / sorted.length;
// for (int i = 0; i < sorted.length; i++) {
// if (sorted[i] >= avg) {
// x = sorted[i];
// index = i;
// break;
// }
// }
// int profit = x * (sorted.length - index);
// return profit;
//
// }
//
// public static int[] sort(int ar[]) {
// for (int j = 0; j < ar.length; j++) {
//
// for (int i = 0; i < ar.length - j - 1; i++) {
// if (ar[i] > ar[i + 1]) {
// int temp;
// temp = ar[i];
// ar[i] = ar[i + 1];
// ar[i + 1] = temp;
// }
// }
//
// }
//
// return ar;
// }
//
//
// public static boolean checkSequence(String a, String b) {
// /* Your class should be named Solution
// * Don't write main().
// * Don't read input, it is passed as function argument.
// * Return output and don't print it.
// * Taking input and printing output is handled automatically.
// */
// int start=0;
// return checkSequence( a, b, start);
//
// }
//
// public static boolean checkSequence(String a,String b,int start){
// if(b.length()==0){
// return true;
// }
// if(a.length()==0){
// return false;
// }
// if(a.charAt(start)==b.charAt(start)){
// boolean ans= checkSequence(a.substring(1),b.substring(1));
// return ans;
// }
// return checkSequence(a.substring(1),b);
// }
// }
// }
