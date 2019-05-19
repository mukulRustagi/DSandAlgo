package recursion;

import java.util.Scanner;

public class ReplacePi {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner in = new Scanner(System.in);
		System.out.print("Enter your string:");
		String input = in.nextLine();
		String output = replace(input);
		System.out.print(output);

	}

	public static String replace(String input) {
		// Write your code here
		int start = 0;
		return replace(input, start);
	}

	public static String replace(String input, int start) {
		// System.out.print(input.length());
		if (start == input.length() - 1) {
			return input;
		}
		replace(input, start + 1);

		if (input.charAt(start) == 'p' && input.charAt(start + 1) == 'i') {
			input = 3.14 + input.substring(start + 2);
			return input;
		}
		return input;

	}

}
