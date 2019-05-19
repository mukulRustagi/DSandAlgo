package stack;

class Node<T> {
	T data;
	Node<T> next;

	public Node(T data) {
		this.data = data;
		next = null;
	}

}

public class StackUsingLL<T> {
	private Node<T> head;
	private int size;

	public StackUsingLL() {
		head = null;
		size = 0;
	}

	public int size() {
		return size;
	}

	public boolean isEmpty() {
		return size() == 00;
	}

	public void push(T data) {
		Node<T> newNode = new Node<>(data);
		newNode.next = head;
		newNode = head;
		size++;
	}

	public T pop() throws StackEmptyException {
		if (size == 0) {
			throw new StackEmptyException();
		}
		T data = head.data;
		head = head.next;
		size--;
		return data;
	}
}
