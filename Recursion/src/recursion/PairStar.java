package recursion;

public class PairStar {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s = "hlllleelo";
		String result = addStars(s);
		System.out.println(result);

	}

	public static String addStars(String s) {
		// Write your code here
		if (s.length() == 1) {
			return s;
		}
		String small = addStars(s.substring(1));
		String ans = "";
		if (s.charAt(0) == small.charAt(0)) {

			ans = ans + s.charAt(0) + "*" + small;
			return ans;
		}
		return ans + s.charAt(0) + small;
	}

}
