
public class LinkedListUse {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Node<Integer> n1 = new Node<>(10);
		System.out.println(n1.data);
		System.out.println(n1.next);

		Node<Integer> n2 = new Node<>(20);

		// Making link b/w node1 and node2 as n2 is reference(address)
		n1.next = n2;

		// to check that link is established or not
		System.out.println(n1.next);
		System.out.println(n2);
	}

}
