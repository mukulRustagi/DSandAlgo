package recursion;

public class SelectionSort {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		int ar[] = { 1, 9, 8, 0, 4, 5, 6, 5 };
		for (int i = 0; i < ar.length; i++) {
			int imin = i;
			for (int j = i + 1; j < ar.length; j++) {
				if (ar[j] < ar[imin]) {
					int temp;
					temp = ar[j];
					ar[j] = ar[imin];
					ar[imin] = temp;
				}
			}
		}

		for (int i = 0; i < ar.length; i++) {
			System.out.print(ar[i]);
		}
	}

}
