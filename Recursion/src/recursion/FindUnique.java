package recursion;

public class FindUnique {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int ar[] = { 1, 3, 1, 4, 2, 3, 2 };
		int res = findUnique(ar);
		System.out.println(res);
	}

	public static int findUnique(int[] arr) {
		/*
		 * Your class should be named FindUnique Don't write main(). Don't read input,
		 * it is passed as function argument. Return output and don't print it. Taking
		 * input and printing output is handled automatically.
		 */
		int result = 0;
		for (int i = 0; i < arr.length; i++) {
			result = result ^ arr[i];
			System.out.print(result);
		}
		return result;
	}
}
