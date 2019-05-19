package recursion;

public class Subsequence {

	public static String[] subsequence(String str) {
		if (str.length() == 0) {
			String[] ans = { "" };
			return ans;
		}
		String smallans[] = subsequence(str.substring(1));
		String ans[] = new String[2 * smallans.length];

		for (int i = 0; i < smallans.length; i++) {
			ans[i] = smallans[i];
		}
		for (int i = 0; i < smallans.length; i++) {
			ans[i + smallans.length] = str.charAt(0) + smallans[i];
		}

		return ans;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String in = "mukul";
		String ans[] = subsequence(in);
		for (int i = 0; i < ans.length; i++) {
			System.out.println(ans[i]);
		}

	}

}
