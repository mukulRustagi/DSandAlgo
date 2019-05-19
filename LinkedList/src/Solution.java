
//public class Solution {
//
//}
/***************
 * Following is the Node class already written class LinkedListNode<T> { T data;
 * LinkedListNode<T> next;
 * 
 * public Node(T data) { this.data = data; } }
 ***************/

public class Solution {

	public static LinkedListNode<Integer> deleteIthNode(LinkedListNode<Integer> head, int i) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Return output and don't print it. Taking
		 * input and printing output is handled automatically.
		 */
		if (i == 0) {
			head = head.next;
			return head;
		}

		if (i >= length(head)) {
			return head;
		}

		int j = 0;
		LinkedListNode<Integer> temp = head;
		while (j < i - 1) {
			temp = temp.next;
			j++;
		}
		Node<Integer> temp2 = temp.next;
		temp.next = temp2.next;
		return head;
	}

}

	public static int length(LinkedListNode<Integer> head){
		/* Your class should be named Solution
		 * Don't write main().
		 * Don't read input, it is passed as function argument.
		 * Return output and don't print it.
	 	 * Taking input and printing output is handled automatically.
		*/
		int count =0;
      while(head.next!=null){
	count ++;
        head =head.next;
      }
      return count+1;
	}
