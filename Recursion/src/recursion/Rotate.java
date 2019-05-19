package recursion;

public class Rotate {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int ar[] = { 1, 2, 3, 4, 5 };
		int d = 2;
		rotate(ar, d);
	}

	public static void rotate(int[] arr, int d) {
		/*
		 * Your class should be named ArrayRotate Don't write main(). Don't read input,
		 * it is passed as function argument. No need to print or return the output.
		 * Taking input and printing the output is handled automatically.
		 */
		int temp = 0;
		for (int i = 0; i < d; i++) {

			for (int j = 0; i < arr.length; i++) {
				if (j == 0) {
					temp = arr[j];
				}
				if (j > 0) {
					arr[j - 1] = arr[j];
				}
			}
			arr[arr.length - 1] = temp;
		}
		for (int i = 0; i < arr.length; i++) {
			System.out.println(arr[i]);
		}
	}

}
