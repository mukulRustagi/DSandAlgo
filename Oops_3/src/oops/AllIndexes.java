package oops;

public class AllIndexes {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		int ar[] = { 9, 8, 5, 8, 7 };
		Solution.allIndexes(ar, 8);
		int arr[] = new int[Solution.allIndexes(ar, 8).length];
		arr = Solution.allIndexes(ar, 8);
		for (int i = 0; i < arr.length; i++) {
			System.out.println(arr[i]);
		}
	}

}

class Solution {

	public static int[] allIndexes(int input[], int x) {
		int start = 0;
		return allIndexes(input, x, start);
	}

	public static int[] allIndexes(int input[], int x, int start) {
		if (start == input.length) {
			int ans[] = new int[0];
			return ans;
		}
		int smallAns[] = allIndexes(input, x, start + 1);
		if (input[start] == x) {
			int ans[] = new int[smallAns.length + 1];
			ans[0] = start;
			for (int i = 0; i < smallAns.length; i++) {
				ans[i + 1] = smallAns[i];
			}
			return ans;
		}
		return smallAns;
	}

}
