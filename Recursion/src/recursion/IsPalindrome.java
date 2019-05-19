package recursion;

import java.util.Scanner;

public class IsPalindrome {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner in = new Scanner(System.in);
		System.out.print("Enter the String that you want to check whether it is palindrome or not:");
		String s = in.nextLine();
		boolean answer = isPalindrome(s);
		System.out.print(answer);

	}

	public static boolean isPalindrome(String in) {
		if (in.length() <= 1) {
			return true;
		}
		int start = 0;
		int last = in.length() - 1;

		return isPalindrome(in, start, last);
	}

	private static boolean isPalindrome(String in, int start, int last) {
		if (start == last) {
			return true;
		}
		if (start == last + 1) {
			if (in.charAt(start) == in.charAt(last + 1)) {
				return true;
			} else {
				return false;
			}
		}
		if (in.charAt(start) == in.charAt(last)) {
			boolean response = isPalindrome(in, start + 1, last - 1);
			if (response) {
				return true;
			} else {
				return false;
			}

		}
		return false;
	}

}
