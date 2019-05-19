package stack;

public class Stack<T> {
	private Node<T> head;
	int size;

	public Stack() {
		head = null;
		size = 0;
	}

	public int size() {
		return size;
	}

	public void push(T data) {
		Node<T> newNode = new Node<T>(data);
		newNode.next = head;
		head = newNode;
		size++;
	}

	public boolean isEmpty() {
		return size() == 0;
	}

	public T pop() throws StackEmptyException {
		if (size() == 0) {
			throw new StackEmptyException();
		}
		T data = head.data;
		head = head.next;
		size--;
		return data;
	}

	public T top() throws StackEmptyException {
		if (size() == 0) {
			throw new StackEmptyException();
		}
		T data = head.data;
		return data;
	}
}