package recursion;

public class LastIndex {
	static int count = 0;
	static int ls;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int x = 4;
		int arr[] = { 10, 2, 9, 5, 4, 6 };
		int index = lastIndex(arr, x);
		System.out.print(index);

	}

	public static int lastIndex(int input[], int x) {
		int start = 0;
		return lastIndex(input, start, x);

	}

	// public static int lastIndex(int input[], int startIndex, int x) {
	// if (startIndex >= input.length) {
	// return -1;
	// }
	//
	// if (x == input[startIndex]) {
	// count++;
	// if (count > 1) {
	// ls = startIndex;
	// }
	// }
	//
	// lastIndex(input, startIndex + 1, x);
	// return ls;
	//
	// }

	public static int lastIndex(int input[], int startIndex, int x) {
		if (startIndex >= input.length) {
			System.out.print("yes");
			return -1;
		}

		int answer = lastIndex(input, startIndex + 1, x);

		if (x == input[startIndex]) {
			return startIndex;
		}

		return answer;

	}
}
