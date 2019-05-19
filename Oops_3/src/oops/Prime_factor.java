package oops;

public class Prime_factor {
	static int arr[] = new int[2];

	public static int LCM(int n1, int n2) {
		int lcm = n1 > n2 ? n1 : n2;
		while (true) {

			if (lcm % n1 == 0 && lcm % n2 == 0) {
				break;
			}
			++lcm;
		}
		System.out.println("lcm is " + lcm);
		return lcm;
	}

	public static void primeFactors(int n) {

		int flag = 0;

		while (n % 2 == 0) {

			if (flag == 0) {

				++flag;
				arr[0] = 2;
			}
			n /= 2;

		}
		for (int i = 3; i <= Math.sqrt(n); i += 2) {
			flag = 0;
			while (n % i == 0) {

				if (flag == 0) {
					++flag;
					arr[1] = i;
				}

				n /= i;
			}
		}
		if (n > 2) {
			if (arr[1] == 0) {
				arr[1] = n;
			}
		}

	}

	public static void main(String[] args) {
		int a = 3;
		int b = 27;
		int lcm = LCM(a, b);
		primeFactors(lcm);
		if (arr[0] != 0 && arr[1] != 0) {
			System.out.print("YES");
		} else {
			System.out.print("NO");
		}
	}

}
