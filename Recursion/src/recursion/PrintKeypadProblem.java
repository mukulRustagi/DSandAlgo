package recursion;

public class PrintKeypadProblem {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		printKeypad(7);
	}

	private static void printKeypad(int n, String output) {
		if (n / 10 == 0) {
			for (int i = 0; i < helper(n).length; i++) {
				System.out.println(helper(n)[i]);
			}
			return;
		}
		for(int i=0;i<helper())
	}

	public static void printKeypad(int n) {
		printKeypad(n, "");
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

}
