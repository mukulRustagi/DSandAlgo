package recursion;

public class AllIndex {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int ar[] = { 1, 2, 3, 5, 6, 8, 5, 6, 7, 8 };
		int y = 5;
		int ans[] = allIndexes(ar, y);
		for (int i = 0; i < ans.length; i++) {
			System.out.println(ans[i]);
		}
	}

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
