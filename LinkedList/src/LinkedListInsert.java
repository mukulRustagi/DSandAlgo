import java.util.Scanner;

public class LinkedListInsert {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Node<Integer> head = insert();
		LinkedList.printdata(head);
		System.out.print(length(head));
		printIth(head, 1);
	}

	public static Node<Integer> insert() {
		Node<Integer> head = null, tail = null;

		Scanner in = new Scanner(System.in);
		int data = in.nextInt();

		while (data != -1) {
			Node<Integer> newNode = new Node<Integer>(data);
			if (head == null) {
				head = newNode;
				tail = newNode;
			} else {
				// Node<Integer> temp = head;
				// while (temp.next != null) {
				// temp = temp.next;
				// }
				// temp.next = newNode;
				tail.next = newNode;
				tail = newNode;
			}
			data = in.nextInt();
		}
		return head;
	}

	public static int length(Node<Integer> head) {
		int count = 0;
		while (head.next != null) {
			count++;
			head = head.next;
		}
		return count + 1;
	}

	public static void printIth(Node<Integer> head, int i) {

		Node<Integer> temp = head;
		if (i >= length(head)) {
			System.out.print("");
		} else {
			int j = 0;
			while (j < i) {
				temp = temp.next;
				j++;
			}
			// System.out.println();
			System.out.print(temp.data);

		}
	}
	
	public static Node<Integer> deleteIthNode(Node<Integer> head, int i){
		/* Your class should be named Solution
		 * Don't write main().
		 * Don't read input, it is passed as function argument.
		 * Return output and don't print it.
	 	 * Taking input and printing output is handled automatically.
		*/
      if(i==0){
        head =head.next;
        return head;
      }
      
      if(i>=length(head)){
        return head;
      }
      
      
      int  j=0;
      Node<Integer> temp=head;
      while(j<i-1){
			temp=temp.next;
        	j++;
      }
      Node<Integer> temp2 =temp.next;
      temp.next=temp2.next;
	return head;
	}
}

}
