package recursion;

public class RemoveDupli {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "aabccba";
		String r = removeConsecutiveDuplicates(str);
		System.out.println(r);
	}

	public static String removeConsecutiveDuplicates(String s) {
		// Write your code here

		if (s.length() == 1) {
			return s;
		}

		String local = removeConsecutiveDuplicates(s.substring(1));
		String ans = "";
		if (s.charAt(0) == local.charAt(0)) {
			ans = ans + s.charAt(0) + local.substring(1);
			return ans;
		}
		return ans + s.charAt(0) + local;

	}

}
