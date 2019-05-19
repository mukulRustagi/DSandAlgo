package recursion;

public class CheckAB {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		boolean ans = checkAB("aabb");
		System.out.print(ans);
	}

	public static boolean checkAB(String input) {
		// Write your code here
		if (input.length() == 1) {
			if (input.charAt(0) == 'a') {
				return true;
			}
			return false;
		}
		String small = input.substring(0, input.length() - 1);
		boolean ans = checkAB(small);
		if (ans == true) {
			if (small.charAt(small.length() - 1) == 'b' && input.charAt(input.length() - 1) == 'b') {
				return true;
			}
			if (small.charAt(small.length() - 1) == 'a' && input.charAt(input.length() - 1) == 'a') {
				return true;
			}
		}

		return false;

	}

}
