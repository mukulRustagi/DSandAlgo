package stack;

public class StackUsingArray {
	private int stack[];
	private int top;

	public StackUsingArray() {
		stack = new int[10];
		top = -1;
	}

	public StackUsingArray(int capacity) {
		stack = new int[capacity];
		top = -1;
	}

	public boolean isEmpty() {
		return (top == -1);
	}

	public int size() {
		return top + 1;
	}

	public void push(int k) {
		if (size() >= stack.length) {
			int temp[] = stack;
			stack = new int[stack.length * 2];
			for (int i = 0; i < temp.length; i++) {
				stack[i] = temp[i];
			}

		}
		top++;
		stack[top] = k;

	}

	public int pop() throws StackEmptyException {
		if (top == -1) {
			StackEmptyException e = new StackEmptyException();
			throw e;
		}
		int temp = stack[top];
		top--;
		return temp;
	}

	public int top() {
		return stack[top];
	}

}
