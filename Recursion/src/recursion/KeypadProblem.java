package recursion;

public class KeypadProblem {

	public static String[] keypad(int number) {
		if (number == 0) {
			String ans[] = { "" };
			return ans;
		}
		String smallans[] = keypad(number / 10);
		String ans[] = new String[helper(number % 10).length * smallans.length];
		String helperout[] = helper(number % 10);
		// System.out.print(ans.length);
		int k = 0;
		for (int i = 0; i < smallans.length; i++) {

			for (int j = 0; j < helperout.length; j++) {
				if (k < ans.length) {
					ans[k] = helperout[j] + smallans[i];
					k++;
				}
			}
		}

		return ans;

	}

	private static String[] helper(int n) {

		if (n == 2) {
			String ans[] = { "a", "b", "c" };
			return ans;
		}
		if (n == 3) {
			String ans[] = { "d", "e", "f" };
			return ans;
		}
		if (n == 4) {
			String ans[] = { "g", "h", "i" };
			return ans;
		}
		if (n == 5) {
			String ans[] = { "j", "k", "l" };
			return ans;
		}
		if (n == 6) {
			String ans[] = { "m", "n", "o" };
			return ans;
		}
		if (n == 7) {
			String ans[] = { "p", "q", "r", "s" };
			return ans;
		}
		if (n == 8) {
			String ans[] = { "t", "u", "v" };
			return ans;
		}
		if (n == 9) {
			String ans[] = { "w", "x", "y", "z" };
			return ans;
		}
		String ans[] = { "" };
		return ans;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String ans[] = keypad(234);
		System.out.println(ans.length);
		for (int i = 0; i < ans.length; i++) {
			System.out.println(ans[i]);
		}
	}

}
