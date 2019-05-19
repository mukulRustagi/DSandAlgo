package hash;

import java.util.ArrayList;
import java.util.HashMap;

public class HashMapUse {

	public static void main(String[] args) {
		int ar[] = { 15, 13, 23, 21, 19, 11, 16 };
		ArrayList<Integer> ans = longestSubsequence(ar);
		for (int i : ans) {
			System.out.print(i + " ");
		}

//		int n = maxFrequencyNumber(ar);
//		System.out.println("highest frequency: " + n);
	}

	public static int maxFrequencyNumber(int[] arr) {

		HashMap<Integer, Integer> map = new HashMap<>();

		for (int i = 0; i < arr.length; i++) {
			if (map.containsKey(arr[i])) {
				map.put(arr[i], map.get(arr[i]) + 1);
			} else {
				map.put(arr[i], 1);
			}
		}

		int max = 0;
		max = Integer.MIN_VALUE;
		int n = 0;

		for (int i : arr) {
			if (map.get(i) > max) {
				max = map.get(i);
				n = i;
			}
		}
		return n;
	}

	public static void intersection(int[] arr1, int[] arr2) {

		HashMap<Integer, Integer> map = new HashMap<>();

		for (int i = 0; i < arr1.length; i++) {
			if (map.containsKey(arr1[i])) {
				map.put(arr1[i], map.get(arr1[i]) + 1);
			} else {
				map.put(arr1[i], 1);
			}
		}

		for (int i = 0; i < arr2.length; i++) {

			if (map.containsKey(arr2[i])) {
				if (map.get(arr2[i]) > 0) {
					System.out.println(arr2[i]);
					map.put(arr2[i], map.get(arr2[i]) - 1);
				}
			}
		}
	}

	public static String uniqueChar(String str) {
		// Write your code here
		String ans = "";
		HashMap<Character, Integer> map = new HashMap<>();
		for (int i = 0; i < str.length(); i++) {

			if (map.containsKey(str.charAt(i))) {
				map.put(str.charAt(i), map.get(str.charAt(i)) + 1);
			} else {
				map.put(str.charAt(i), 1);
			}
		}

		for (int i = 0; i < str.length(); i++) {
			if (map.get(str.charAt(i)) > 0) {
				if (map.containsKey(str.charAt(i))) {
					map.put(str.charAt(i), 0);
					ans += str.charAt(i);
				}
			}

		}
		return ans;
	}

	public static void PairSum(int[] input, int size) {
		HashMap<Integer, Integer> map = new HashMap<>();
		for (int i = 0; i < size; i++) {
			int key = input[i];
			if (map.containsKey(key)) {
				int value = map.get(key);
				map.put(key, value + 1);
			} else {
				map.put(key, 1);
			}
		}
		for (int i = 0; i < size; i++) {
			int key = input[i];
			if (map.containsKey(-key) && map.get(key) != 0) {
				int times = map.get(key) * map.get(-key);
				while (times != 0) {
					System.out.print(Math.min(key, (-key)) + " ");
					System.out.println(Math.max(key, (-key)));
					times--;
				}

			}
			map.put(key, 0);
			map.put(-key, 0);
		}

	}

	public static ArrayList<Integer> longestSubsequence(int[] arr) {
		// Write your code here
		ArrayList<Integer> output;
		HashMap<Integer, Boolean> map = new HashMap<>();
		for (int i = 0; i < arr.length; i++) {
			map.put(arr[i], true);
		}
		int Maxlength = 0;
		int start = 0;
		int Ml = 0;
		int s = 0;
		for (int i = 0; i < arr.length; i++) {
			if (map.get(arr[i]) == true) {
				map.put(arr[i], false);
				Maxlength = 1;
				int j = arr[i] + 1;
				start = arr[i];
				while (map.containsKey(j)) {
					map.put(j, false);
					Maxlength += 1;
					j++;
				}
				j = arr[i] - 1;
				while (map.containsKey(j)) {
					start--;
					map.put(j, false);
					Maxlength += 1;
					j--;
				}

			}
			if (Maxlength > Ml) {
				Ml = Maxlength;
				s = start;
			}
		}
		output = new ArrayList<>();
		for (int i = s; i < Ml + s; i++) {
			output.add(i);
		}
		return output;
	}

}
