package stack;

public class StackUse {

	public static void main(String args[]) throws StackEmptyException {
		StackUsingArray s = new StackUsingArray();
		boolean ans = s.isEmpty();
		System.out.println(ans);
		for (int i = 0; i < 100; i++) {
			s.push(i);

		}
		System.out.println("after pushing " + s.isEmpty());
		for (int i = 0; i < 100; i++) {
			System.out.println(s.pop());
		}
		System.out.print(s.isEmpty());

	}
}
