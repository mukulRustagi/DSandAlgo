
package oops;

public class Demo {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		Scanner in = new Scanner(System.in);
//		String input = in.nextLine();
//		distinctAlpha(input);
		int ar[] = { 1, 2 };
		int sum = sum(ar);
		System.out.print(sum);
	}

//	public static void distinctAlpha(String input) {
//		int count = 1;
//		String ans = " ";
//		for (int i = 0; i < input.length() - 1; i++) {
//			if (input.charAt(i) == input.charAt(i + 1)) {
//				count++;
//			} else {
//				System.out.print(input.charAt(i));
//				ans = ans + count + (input.charAt(i));
//				count = 1;
//			}
//			if (i == input.length() - 1) {
//				ans = ans + count + input.charAt(i);
//			}
//		}
//		System.out.print(ans);
//	}
	public static int sum(int input[]) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Return output and don't print it. Taking
		 * input and printing output is handled automatically.
		 */
		if (input.length == 1) {
			return input[0];
		}
		int smallArray[] = new int[input.length - 1];
		for (int i = 1; i < input.length; i++) {
			smallArray[i - 1] = input[i];
		}
		return input[0] + sum(smallArray);

	}

}
