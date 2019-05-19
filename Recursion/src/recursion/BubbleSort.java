package recursion;

public class BubbleSort {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int ar[] = { 9, 8, 7, 6, 5, 4, 3, 2, 1 };

		for (int j = 0; j < ar.length; j++) {

			for (int i = 0; i < ar.length - j - 1; i++) {
				if (ar[i] > ar[i + 1]) {
					int temp;
					temp = ar[i];
					ar[i] = ar[i + 1];
					ar[i + 1] = temp;
				}
			}

		}

		for (int i = 0; i < ar.length; i++) {
			System.out.println(ar[i]);
		}
		// System.out.print(ar[ar.length - 1]);
	}

}
