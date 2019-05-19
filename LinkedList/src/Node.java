
public class Node<T> {
	T data;
	Node<T> next; // Node is going to point the node that has same datatype from where pointer has
					// originated.

	Node(T data) {
		this.data = data;
		next = null;
	}

}
