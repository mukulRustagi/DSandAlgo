
public class Stack {
	private int data[];
	private int top;

	public Stack() {
		top = -1;
		data = new int[10];
	}

	public Stack(int capacity) {
		top = -1;
		data = new int[capacity];
	}

	public boolean isempty() {
		return (top == -1);
	}

	public int size() {
		return top + 1;
	}

	public int top() throws StackEmptyExpection {
		if (top == -1) {
			StackEmptyExpection e = new StackEmptyExpection();
			throw e;
		}
		return data[top];
	}

	public void push(int element) throws StackFullException {
		if (size() == data.length) {
			StackFullException e = new StackFullException();
			throw e;
		}
		top = top + 1;
		data[top] = element;
	}

	public int pop() throws StackEmptyExpection {
		if (top == -1) {
			StackEmptyExpection e = new StackEmptyExpection();
			throw e;
		}
		int dt = data[top];
		top--;
		return dt;
	}
}
