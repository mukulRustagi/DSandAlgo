package recursion;

public class Intersection {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int ar1[] = { 1, 2, 4 };
		int ar2[] = { 3, 4, 5, 7 };
		intersection(ar1, ar2);
	}

	public static void intersection(int[] arr1, int[] arr2) {
		/*
		 * Your class should be named Intersection Don't write main(). Don't read input,
		 * it is passed as function argument. Print output and don't return it. Taking
		 * input is handled automatically.
		 */

		for (int i = 0; i < arr1.length; i++) {

			for (int j = 0; j < arr2.length; j++) {
				int flag = 0;
				if (arr1[i] == arr2[j]) {
					flag++;
				}
				if (flag == 1) {
					System.out.print(arr2[j]);
				}
			}
		}

	}

}
