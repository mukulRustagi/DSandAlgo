package recursion;

public class BinarySearch {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int n = 13;
		int ar[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
		int ans = binarySearch(n, ar) + 1;
		System.out.println(ans);
	}

	public static int binarySearch(int n, int ar[]) {
		int start = 0;
		int end = ar.length;
		return binarySearch(n, ar, start, end);
	}

	private static int binarySearch(int n, int ar[], int start, int end) {

		int middle = (start + end) / 2;

		if (end < start) {
			return -1;
		}

		if (n < ar[middle]) {
			return binarySearch(n, ar, start, middle - 1);
		}

		if (n > ar[middle]) {
			return binarySearch(n, ar, middle + 1, end);
		}

		if (n == ar[middle]) {
			return middle;
		}

		return -1;
		// if (start == end) {
		// if (n == ar[start]) {
		// return start;
		// } else {
		// return -1;
		// }
		// }
		// int mid = (start + end) / 2;
		// int ans = 0;
		// if (n < ar[mid]) {
		// ans = binaryn(n, ar, start, mid);
		// }
		// if (n > ar[mid]) {
		// ans = binaryn(n, ar, mid, end);
		// }
		// if (n == ar[mid]) {
		// return mid;
		// }
		// return ans;

	}

}
