package hackerRank;

import java.util.HashMap;
import java.util.Map;

public class Practice {

	public static void main(String args[]) {
		int ar[] = { 1, 2, 5, 3, 7, 8, 6, 4 };
//		minimumBribes(ar);
		/*
		 * two times three is not four two times two is four
		 * 
		 */
		String mag[] = { "two", "times", "three", "is", "not", "four" };
		String note[] = { "two", "times", "two", "four" };
		checkMagazine(mag, note);
	}

	static void minimumBribes(int[] q) {
		int bribe = 0;
		boolean chaotic = false;
		int n = q.length;
		for (int i = 0; i < n - 1; i++) {
			if (q[i] - (i + 1) > 2) {
				chaotic = true;
				break;
			}
			for (int j = i + 1; j < n; j++)
				if (q[i] > q[j])
					bribe++;
		}
		if (chaotic)
			System.out.println("Too chaotic");
		else
			System.out.println(bribe);
	}

	static void checkMagazine(String[] magazine, String[] note) {
		boolean isPossible = false;
		HashMap<String, Integer> hm = new HashMap<>();
		for (int i = 0; i < note.length; i++) {
			if (!hm.containsKey(note[i])) {
				hm.put(note[i], 1);
			} else {
				hm.put(note[i], hm.get(note[i]) + 1);
			}
		}
		HashMap<String, Integer> hm1 = new HashMap<>();
		for (int i = 0; i < magazine.length; i++) {
			if (!hm1.containsKey(magazine[i])) {
				hm1.put(magazine[i], 1);
			} else {
				hm1.put(magazine[i], hm1.get(magazine[i]) + 1);
			}
		}
		for (Map.Entry m : hm.entrySet()) {
			// String compKey =m.getKey();
			// int compValue= m.getValue();
			String key = (String) m.getKey();
			Integer value = (Integer) m.getValue();
			if (hm1.containsKey(m.getKey())) {

				if (hm1.get(key) >= value) {
					isPossible = true;
				} else {
					isPossible = false;
					break;
				}

			} else {
				isPossible = false;
				break;
			}
		}
		if (isPossible) {
			System.out.print("Yes");
		} else {
			System.out.print("No");
		}
	}

}
