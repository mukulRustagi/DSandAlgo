package recursion;

public class test {

	public static void main(String[] args) {
		secondSmallest(10);
	}

	public static int maximumProfit(int budget[]) {
		// Write your code here
		budget = mergeSort(budget);
		int cost[] = new int[budget.length];
		for (int i = 0; i < budget.length; i++) {
			cost[i] = budget[i] * (budget.length - i);
		}
		int max = Integer.MIN_VALUE;
		for (int i : cost) {
			if (i > max)
				max = i;
		}
		return max;

	}

	public static int[] merge(int arr1[], int arr2[]) {
		int i = 0, j = 0, k = 0;
		int output[] = new int[arr1.length + arr2.length];
		while ((i < arr1.length) && (j < arr2.length)) {
			if (arr1[i] <= arr2[j]) {
				output[k] = arr1[i];
				i++;
				k++;
			} else {
				output[k] = arr2[j];
				k++;
				j++;

			}
		}
		while (i < arr1.length) {
			output[k] = arr1[i];
			i++;
			k++;
		}
		while (j < arr2.length) {
			output[k] = arr2[j];
			j++;
			k++;
		}
		return output;
	}

	public static int[] mergeSort(int input[]) {
		if (input.length == 1) {
			int out[] = { input[0] };
			return out;
		}

		int lefthalf[] = new int[input.length / 2];
		int righthalf[] = new int[input.length - (input.length / 2)];
		for (int i = 0; i < lefthalf.length; i++) {
			lefthalf[i] = input[i];
		}
		for (int i = 0; i < righthalf.length; i++) {
			righthalf[i] = input[lefthalf.length + 1];
		}

		lefthalf = mergeSort(lefthalf);
		righthalf = mergeSort(righthalf);
		input = merge(lefthalf, righthalf);
		return input;
	}

	public static int secondSmallest(int ar) {

		int min = Integer.MIN_VALUE;

		System.out.println(min);
		return 0;

	}

}
