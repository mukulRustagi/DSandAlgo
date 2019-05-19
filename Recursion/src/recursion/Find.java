package recursion;

public class Find {

	static int i = 0;

	public static void main(String args[]) {
		int ar[] = { 1213, 234, 33, 43, 423, 45, 23, 22, 343, 45, 4 };
		int x = 43;
		boolean find = checkNumber(ar, x);
		System.out.print(find);
	}

	public static boolean checkNumber(int input[], int x) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Return output and don't print it. Taking
		 * input and printing output is handled automatically.
		 */
		if (input.length == 0) {
			return false;
		}
		if (x == input[0]) {
			return true;
		}

		int small[] = new int[input.length - 1];
		for (int i = 1; i < input.length; i++) {
			small[i - 1] = input[i];
		}
		return checkNumber(small, x);
	}

}
