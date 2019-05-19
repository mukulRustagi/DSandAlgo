package recursion;

public class ConvertStringToInt {

	static int value;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s = "164655768";
		int result = convertStringToInt(s);
		System.out.println(result);
	}

	public static int convertStringToInt(String input) {
		// Write your code here

		if (input.length() == 1) {
			return Integer.parseInt(input);

		}
		int res = convertStringToInt(input.substring(1));
		value = Character.getNumericValue(input.charAt(0)) * power.pow(10, input.length() - 1) + res;
		return value;
	}

}
