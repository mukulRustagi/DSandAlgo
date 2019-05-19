package array;

import java.util.Scanner;

public class Maximu {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int t = sc.nextInt();

		while (t-- > 0) {
			int n = sc.nextInt();
			Height arr[] = new Height[n];
			for (int i = 0; i < n; i++) {
				int temp1 = sc.nextInt();
				int temp2 = sc.nextInt();
				arr[i] = new Height(temp1, temp2);

			}
			GfG gfg = new GfG();

			int res = gfg.findMax(arr, n);
			System.out.println(res);
		}
		sc.close();
	}
}

class Height {
	int feet;
	int inches;

	public Height(int ft, int inc) {
		feet = ft;
		inches = inc;
	}
}

class GfG {
	public int findMax(Height arr[], int n) {
		// your code here
		int height[] = new int[n];
		int j = 0;
		for (int i = 0; i < arr.length; i++) {
			height[j] = arr[i].feet * 12 + arr[i].inches;
			j++;
		}
		int max = height[0];
		for (int i = 1; i < height.length; i++) {
			if (max < height[i]) {
				max = height[i];
			}
		}
		return max;

	}
}