import java.util.Scanner;

public class LinkedList {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Node<Integer> head = createList();
		// Node<Integer> oddEven = sortEvenOdd(head);
		// printdata(oddEven);
		printdata(skipMdeleteN(head, 2, 3));
		// printdata(head);
		// System.out.print(indexOfNRec(head, 6));
		// head = reverse_iterative(head);
		// printdata(head);
		// head = deleteIthNodeRec(head, 6);
		// printdata(head);
		// DoubleLL ans = new DoubleLL();
		// head = mergeSort(head);
		// printdata(head);
		// ans = better_reverse(head);
		// printdata(ans.head);

		// Node<Integer> head1 = createList();
		// printdata(head1);
		// Node<Integer> merged = merge(head, head1);
		// printdata(merged);
		// Node<Integer> middle = middlePoint(head);
		// System.out.print(middle.data);

		// int index = indexOfNIter(head, 15);
		// System.out.print("Index: " + index);

	}

	public static int length(Node<Integer> head) {
		int count = 0;
		while (head.next != null) {
			count++;
			head = head.next;
		}
		return count + 1;
	}

	public static Node<Integer> createList() {
		Scanner in = new Scanner(System.in);
		int data = in.nextInt();
		Node<Integer> head = null, tail = null;
		while (data != -1) {
			Node<Integer> newNode = new Node<Integer>(data);
			if (head == null) {
				head = newNode;
				tail = newNode;
			} else {
				tail.next = newNode;
				tail = newNode;
			}
			data = in.nextInt();
		}
		return head;
	}

	public static Node<Integer> InsertAtIth(Node<Integer> head, int pos, int data) {
		Node<Integer> newNode = new Node<Integer>(data);
		if (pos == 0) {
			newNode.next = head;
			return newNode;
		}
		int i = 0;
		Node<Integer> temp = head;
		if (i < pos - 1) {
			temp = temp.next;
		}
		newNode.next = temp.next;
		temp.next = newNode;
		return head;
	}

	public static Node<Integer> deleteIthNode(Node<Integer> head, int i) {
		if (i == 0) {
			head = head.next;
			return head;
		}
		if (i >= length(head)) {
			return head;
		}
		int j = 0;
		Node<Integer> temp = head;
		while (j < i - 1) {
			temp = temp.next;
			j++;
		}
		Node<Integer> temp2 = temp.next;
		temp.next = temp2.next;
		return head;
	}

	public static void printdata(Node<Integer> Head) {
		while (Head != null) {
			System.out.print(Head.data + " ");
			Head = Head.next;
		}
		System.out.println();
	}

	public static void printIth(Node<Integer> head, int i) {
		Node<Integer> temp = head;
		int j = 0;
		while (j < i) {
			temp = temp.next;
			j++;
		}
		System.out.print(temp.data);
	}

	public static int indexOfNIter(Node<Integer> head, int n) {
		Node<Integer> temp = head;
		int i = 0;
		int length = length(head);
		while (i < length) {
			if (n == temp.data) {
				return i;
			}
			i++;
			temp = temp.next;
		}
		return -1;
	}

	public static Node<Integer> middlePoint(Node<Integer> head) {
		Node<Integer> temp_f = head;
		Node<Integer> temp_s = head;

		if (length(head) <= 2) {
			return head;
		}
		if (length(head) % 2 == 0) {
			Node<Integer> end = head;

			while (end.next != null) {
				temp_f = temp_f.next.next;
				temp_s = temp_s.next;
				end = temp_f.next;
			}
			return temp_s;
		}
		while (temp_f.next != null) {

			temp_f = temp_f.next.next;
			temp_s = temp_s.next;
		}
		return temp_s;

	}

	public static Node<Integer> merge(Node<Integer> head1, Node<Integer> head2) {
		Node<Integer> head3 = null;

		if (head1.data < head2.data) {
			head3 = head1;
			head1 = head1.next;
		} else {
			head3 = head2;
			head2 = head2.next;
		}
		Node<Integer> tail = head3;
		while (head1 != null || head2 != null) {
			if (head1 == null) {
				tail.next = head2;
				break;
			}
			if (head2 == null) {
				tail.next = head1;
				break;
			}

			if (head1.data < head2.data) {
				tail.next = head1;
				head1 = head1.next;
			} else {
				tail.next = head2;
				head2 = head2.next;
			}
			tail = tail.next;
		}

		return head3;

	}

	public static Node<Integer> mergeSort(Node<Integer> head) {
		if (length(head) <= 1) {
			return head;
		}
		Node<Integer> mid = middlePoint(head);
		Node<Integer> secondHead = mid.next;
		mid.next = null;
		Node<Integer> firstHead = head;
		firstHead = mergeSort(firstHead);
		secondHead = mergeSort(secondHead);
		return merge(firstHead, secondHead);

	}

	// recursive reverse with O(n^2) complexity
	public static Node<Integer> reverse_R(Node<Integer> head) {
		if (head == null || head.next == null) {
			return head;
		}

		Node<Integer> reverseHead = reverse_R(head.next);
		Node<Integer> temp = reverseHead;
		while (temp.next != null) {
			temp = temp.next;
		}

		temp.next = head;
		head.next = null;
		return reverseHead;
	}

	// recursive reverse with O(n) complexity
	public static DoubleLL better_reverse(Node<Integer> head) {

		if (head == null || head.next == null) {
			// to return more than one value
			DoubleLL dl = new DoubleLL();
			dl.head = head;
			dl.tail = head;
			return dl;
		}
		DoubleLL reverse = better_reverse(head.next);
		reverse.tail.next = head;
		head.next = null;
		reverse.tail = head;
		return reverse;
	}

	// Iterative reverse
	public static Node<Integer> reverse_iterative(Node<Integer> head) {
		Node<Integer> current = head;
		Node<Integer> previous = null;
		Node<Integer> temp = null;
		while (current != null) {
			temp = current.next;
			current.next = previous;
			previous = current;
			current = temp;
		}
		// as current after the iteration is pointing to the null hence, previous would
		// be the one who will point at the last node and act as head.
		return previous;
	}

	public static Node<Integer> deleteIthNodeRec(Node<Integer> head, int i) {
		if (head == null) {
			return head;
		}
		if (i == 1) {
			head = head.next;
			return head;
		}
		head.next = deleteIthNodeRec(head.next, i - 1);
		return head;
	}

	static int index = 0;

	public static int indexOfNRec(Node<Integer> head, int n) {
		if (head == null) {
			return -1;
		}
		if (head.data == n) {
			return index;
		} else {
			index++;
		}
		int i = indexOfNRec(head.next, n);
		return i;

	}

	public static Node<Integer> sortEvenOdd(Node<Integer> head) {
		if (head == null) {
			return head;
		}
		Node<Integer> even_head = null;
		Node<Integer> even_tail = null;
		int e_flag = 0;
		int o_flag = 0;
		Node<Integer> odd_head = null;
		Node<Integer> odd_tail = null;
		if (head.data % 2 == 0) {
			even_head = head;
			even_tail = head;
			e_flag++;
		} else {
			odd_head = head;
			odd_tail = head;
			o_flag++;
		}
		Node<Integer> temp = head.next;
		while (temp != null) {
			if (temp.data % 2 == 0) {
				if (e_flag == 0) {
					even_head = temp;
					even_tail = temp;
					e_flag++;
				} else {
					even_tail.next = temp;
					even_tail = temp;
				}
			} else {
				if (o_flag == 0) {
					odd_head = temp;
					odd_tail = temp;
					o_flag++;
				} else {
					odd_tail.next = temp;
					odd_tail = temp;
				}
			}

			temp = temp.next;
		}
		if (even_head != null) {
			even_tail.next = null;
		}

		if (odd_head == null) {
			return even_head;
		}
		odd_tail.next = null;
		odd_tail.next = even_head;
		return odd_head;
	}

	public static Node<Integer> skipMdeleteN(Node<Integer> head, int M, int N) {
		Node<Integer> new_head = head;
		Node<Integer> new_tail = head;
		Node<Integer> temp = head;
		while (temp != null) {
			for (int c1 = 0; c1 < N; c1++) {
				if (new_tail == head) {
					c1++;
				}
				temp = temp.next;
				if (temp == null) {
					new_tail.next = null;
					return new_head;
				}
				new_tail.next = temp;
				new_tail = temp;
			}
			for (int c2 = 0; c2 < M; c2++) {
				temp = temp.next;
				if (temp == null) {
					new_tail.next = null;
					return new_head;
				}
			}
			new_tail.next = null;
		}
		return new_head;
	}
}
