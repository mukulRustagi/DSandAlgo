package binaryTree;

import java.util.ArrayList;
import java.util.Scanner;
import java.util.Stack;

import tree.Pair;

class PairOfNodeElem {
	LinkedListNode<Integer> head;
	LinkedListNode<Integer> tail;

}

public class BinaryTreeUse {

//	complicated input to user(not level wise)
	public static BinaryTreeNode<Integer> takeInput(Scanner s) {
		int data;
		System.out.println("Enter node data: ");
		data = s.nextInt();
		BinaryTreeNode<Integer> root = new BinaryTreeNode<>(data);
		if (data == -1) {
			return null;
		}
		root.left = takeInput(s);
		root.right = takeInput(s);

		return root;
	}

	public static int countNodes(BinaryTreeNode<Integer> root) {
		if (root == null) {
			return 0;
		}
		int ans = 1;
		ans += countNodes(root.left);
		ans += countNodes(root.right);
		return ans;
	}

//	user friendly input
	public static BinaryTreeNode<Integer> takeInputLevelWise(Scanner s) {
		int data;
		System.out.println("Enter node data: ");
		data = s.nextInt();
		if (data == -1) {
			return null;
		}
		QueueUsingLL<BinaryTreeNode<Integer>> q = new QueueUsingLL<>();
		BinaryTreeNode<Integer> root = new BinaryTreeNode<>(data);
		q.enqueue(root);
		try {
			while (!q.isEmpty()) {
				BinaryTreeNode<Integer> temp = q.dequeue();
				System.out.println("Enter left node of " + temp.data + ":");
				int left_data = s.nextInt();
				if (left_data != -1) {
					BinaryTreeNode<Integer> left = new BinaryTreeNode<>(left_data);
					q.enqueue(left);
					temp.left = left;
				}

				System.out.println("Enter right node of " + temp.data + ":");
				int right_data = s.nextInt();
				if (right_data != -1) {
					BinaryTreeNode<Integer> right = new BinaryTreeNode<>(right_data);
					temp.right = right;
					q.enqueue(right);

				}
			}
		} catch (QueueEmptyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return root;
	}

	public static boolean isNodePresent(BinaryTreeNode<Integer> root, int x) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Return output and don't print it. Taking
		 * input and printing output is handled automatically.
		 */
		if (root == null) {
			return false;
		}
		if (root.data == x) {
			return true;
		} else {

			boolean ans = isNodePresent(root.left, x);
			if (ans == false) {
				return isNodePresent(root.right, x);
			}
			return ans;
		}

	}

	public static void print(BinaryTreeNode<Integer> root) {
		if (root == null) {
			return;
		}
		String s = root.data + "";
		if (root.left != null) {
			s += "L:" + root.left.data;
		}
		if (root.right != null) {
			s += "R:" + root.right.data;
		}
		System.out.println(s);
		print(root.left);
		print(root.right);
	}

	public static void preOrder(BinaryTreeNode<Integer> root) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Print output and don't return it. Taking
		 * input is handled automatically.
		 */
		if (root == null) {
			return;
		}
		String s = root.data + "";
		System.out.print(s + " ");
		if (root.left == null) {
			return;
		}
		preOrder(root.left);
		if (root.right == null) {
			return;
		}
		preOrder(root.right);
	}

	public static void printLevelWise(BinaryTreeNode<Integer> root) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Print output and don't return it. Taking
		 * input is handled automatically.
		 */
		QueueUsingLL<BinaryTreeNode<Integer>> q = new QueueUsingLL<>();
		q.enqueue(root);
		String s = "";
		while (!q.isEmpty()) {
			try {
				BinaryTreeNode<Integer> front = q.dequeue();
				if (front != null) {
					s = front.data + ":";
					if (front.left != null) {
						int left_data = front.left.data;
						s += "L:" + left_data + ",";

					} else {
						s += "L:" + "-1" + ",";
					}
					if (front.right != null) {
						int right_data = front.right.data;
						s += "R:" + right_data;

					} else {
						s += "R:" + "-1";
					}
					q.enqueue(front.left);
					q.enqueue(front.right);

					System.out.println(s);
				}

			} catch (QueueEmptyException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}

	public static void postOrder(BinaryTreeNode<Integer> root) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Print output and don't return it. Taking
		 * input is handled automatically.
		 */
		if (root == null) {
			return;
		}
		String s = "";
		if (root.left == null && root.right == null) {
			s += root.data;
			System.out.print(s + " ");
			return;
		}
		postOrder(root.left);
		postOrder(root.right);
		s += root.data;
		System.out.print(s + " ");
		return;
	}

	public static void main(String args[]) {
//		BinaryTreeNode<Integer> root = takeInputLevelWise(new Scanner(System.in));
//		printLevelWise(root);
//		postOrder(root);
		BinaryTreeNode<Integer> root = takeInputLevelWise(new Scanner(System.in));
		printLevelWise(root);
		LinkedListLevelWise(root);

	}

//	BST Code Starts from here

//	searching in BST

//	check BST or not(compact form).
//	start

	public static boolean help(BinaryTreeNode<Integer> root, int min, int max) {
		if (root == null)
			return true;
		if (root.data > max || root.data < min)
			return false;
		return (help(root.left, min, root.data) && help(root.right, root.data, max));
	}

	public static boolean isBST1(BinaryTreeNode<Integer> root) {
		return help(root, Integer.MIN_VALUE, Integer.MAX_VALUE);
	}

//	end

	// check BST detailed and not optimisied
	public static boolean isBST(BinaryTreeNode<Integer> root) {
		// k time
		if (root == null)
			return true;
		// O(nlogn) and in case of right tree it's O(n^2)
		int leftMax = maximum(root.left);
		int rightMin = minimum(root.right);
		// k time
		if (root.data < leftMax && root.data > rightMin)
			return false;
//		recursive calls
		boolean isLeftBST = isBST(root.left);
		boolean isRightBST = isBST(root.right);
		// k time
		if (isLeftBST && isRightBST)
			return true;
		else
			return false;

	}

	public static int maximum(BinaryTreeNode<Integer> root) {
		if (root == null)
			return Integer.MIN_VALUE;
		return Math.max(root.data, Math.max(maximum(root.left), maximum(root.right)));
	}

	public static int minimum(BinaryTreeNode<Integer> root) {
		if (root == null)
			return Integer.MAX_VALUE;
		return Math.max(root.data, Math.min(maximum(root.left), maximum(root.right)));
	}
// end

	public static Pair<Boolean, Pair<Integer, Integer>> isBST3(BinaryTreeNode<Integer> root) {
		if (root == null) {
			Pair<Boolean, Pair<Integer, Integer>> output = new Pair<>();
			output.first = true;
			output.second = new Pair<>();
			output.second.first = Integer.MAX_VALUE;
			output.second.second = Integer.MIN_VALUE;
			return output;
		}

		Pair<Boolean, Pair<Integer, Integer>> leftOutput = isBST3(root.left);
		Pair<Boolean, Pair<Integer, Integer>> rightOutput = isBST3(root.right);
// we are finding min  and maximum for subtree because we need max from left sub tree and min from right subtree 
// so for both to be returned we would be requiring two functions in order to not to do the same what we'll do we is we'll extract both min and max for both the trees.
		int min = Math.min(root.data, Math.min(leftOutput.second.first, rightOutput.second.first));
		int max = Math.max(root.data, Math.max(leftOutput.second.second, rightOutput.second.second));

		boolean isBST = (root.data > leftOutput.second.second) && (root.data <= rightOutput.second.first)
				&& leftOutput.first && rightOutput.first;

		Pair<Boolean, Pair<Integer, Integer>> output = new Pair<>();
		output.first = isBST;
		output.second = new Pair<>();
		output.second.first = min;
		output.second.second = max;
		return output;
	}

// new method to check bst by using range of data which could be inserted	
	public static boolean checkBST4(BinaryTreeNode<Integer> root) {
		return checkBST4Help(root, Integer.MIN_VALUE, Integer.MAX_VALUE);
	}

	private static boolean checkBST4Help(BinaryTreeNode<Integer> root, int min, int max) {
		if (root == null) {
			return true;
		}
		if (root.data < min || root.data > max) {
			return false;
		}
		boolean isLeftBST = checkBST4Help(root.left, min, root.data - 1);
		boolean isRightBST = checkBST4Help(root.right, root.data, max);

		if (isLeftBST && isRightBST)
			return true;
		else
			return false;
	}

//	sorted array to BST

	public static BinaryTreeNode<Integer> SortedArrayToBST(int[] arr) {
		/*
		 * Your class should be named Solution Don't write main(). Don't read input, it
		 * is passed as function argument. Return output and don't print it. Taking
		 * input and printing output is handled automatically.
		 */
		return SortedArrayToBSTHelp(arr, 0, arr.length - 1);
	}

	private static BinaryTreeNode<Integer> SortedArrayToBSTHelp(int arr[], int s, int e) {
		if (s == e) {
			BinaryTreeNode<Integer> newNode = new BinaryTreeNode<>(arr[s]);
			return newNode;
		}
		if (s > e) {
			return null;
		}
		int mid = (s + e) / 2;
		BinaryTreeNode<Integer> root = new BinaryTreeNode<Integer>(arr[mid]);
		root.left = SortedArrayToBSTHelp(arr, s, mid - 1);
		root.right = SortedArrayToBSTHelp(arr, mid + 1, e);
		return root;
	}

//	BST to sorted LL
//	public static LinkedListNode<Integer> BSTToSortedLL(BinaryTreeNode<Integer> root) {
//		/*
//		 * Your class should be named Solution Don't write main(). Don't read input, it
//		 * is passed as function argument. Return output and don't print it. Taking
//		 * input and printing output is handled automatically.
//		 */
//
//		if (root == null) {
//			LinkedListNode<Integer> head = null;
//			return head;
//		}
//		if (root.left == null || root.right == null) {
//			LinkedListNode<Integer> head = new LinkedListNode<>(root.data);
//			return head;
//		}
//
//		LinkedListNode<Integer> leftHead = null;
//		if (root.left != null) {
//			leftHead = BSTToSortedLL(root.left);
//		}
//
//		LinkedListNode<Integer> temp = leftHead;
//		while (temp.next != null) {
//			temp = temp.next;
//		}
//		temp.next = new LinkedListNode<Integer>(root.data);
//		temp = temp.next;
//
//		if (root.right != null) {
//			LinkedListNode<Integer> rightHead = BSTToSortedLL(root.right);
//			temp.next = rightHead;
//			temp = temp.next;
//		}
//		return leftHead;
//	}
//#######################################################################################

//	BST to sorted Linked list.
	public static LinkedListNode<Integer> BSTToSortedLL(BinaryTreeNode<Integer> root) {
		return helper(root).head;
	}

	private static PairOfNodeElem helper(BinaryTreeNode<Integer> root) {

		if (root == null) {
			PairOfNodeElem pair = new PairOfNodeElem();
			pair.head = null;
			pair.tail = null;
			return pair;
		}
		LinkedListNode<Integer> nn = new LinkedListNode<Integer>(root.data);
		PairOfNodeElem leftTree = helper(root.left);
		PairOfNodeElem rightTree = helper(root.right);
		PairOfNodeElem pair = new PairOfNodeElem();
		if (leftTree.head != null) {
			pair.head = leftTree.head;
			pair.tail = leftTree.tail;
			pair.tail.next = nn;
			pair.tail = nn;
			if (rightTree.head == null) {
				return pair;
			}
		}
		if (rightTree.head != null && leftTree.head != null) {
			pair.tail.next = rightTree.head;
			pair.tail = rightTree.tail;
			return pair;
		}
		if (rightTree.head != null && leftTree.head == null) {
			pair.head = nn;
			nn.next = rightTree.head;
			pair.tail = rightTree.tail;
			return pair;
		} else {
			pair.head = nn;
			pair.tail = nn;
		}
		return pair;
	}

//	############################################################################################

//	return an arrayList which includes path to searched data, for binary tree.
	public static ArrayList<Integer> getRootToNodePath(BinaryTreeNode<Integer> root, int data) {
		if (root == null) {
			return null;
		}
		if (root.data == data) {
			ArrayList<Integer> output = new ArrayList<>();
			output.add(root.data);
		}

		ArrayList<Integer> leftOutput = getRootToNodePath(root.left, data);
		if (leftOutput != null) {
			leftOutput.add(root.data);
			return leftOutput;
		}

		ArrayList<Integer> rightOutput = getRootToNodePath(root.right, data);
		if (rightOutput != null) {
			rightOutput.add(root.data);
			return rightOutput;
		} else {
			return null;
		}
	}

//	############################################################################################

//	return an arrayList which includes path to searched data, for binary search tree.	
	public static ArrayList<Integer> findPath(BinaryTreeNode<Integer> root, int data) {
		if (root == null) {
			return null;
		}

		if (root.data == data) {
			ArrayList<Integer> output = new ArrayList<Integer>();
			output.add(root.data);
		}

		if (data < root.data) {
			ArrayList<Integer> leftOutput = findPath(root.left, data);
			if (leftOutput != null) {
				leftOutput.add(root.data);
			}
			return leftOutput;
		}

		if (data > root.data) {
			ArrayList<Integer> rightOutput = findPath(root.right, data);
			if (rightOutput != null) {
				rightOutput.add(root.data);
			}
			return rightOutput;
		} else {
			return null;
		}
	}

	public static class checkBalancedAndHeight {
		int height;
		boolean isBalanced;
	}

	/*
	 * public static ArrayList<Node<BinaryTreeNode<Integer>>>
	 * LLForEachLevel(BinaryTreeNode<Integer> root) {
	 * 
	 * if (root == null) { return null; }
	 * 
	 * QueueUsingLL<BinaryTreeNode<Integer>> queue = new QueueUsingLL<>();
	 * 
	 * queue.enqueue(root);
	 * 
	 * }
	 */

	public static void printZigZag(BinaryTreeNode<Integer> root) {
		if (root == null) {
			return;
		}

		QueueUsingLL<BinaryTreeNode<Integer>> queue = new QueueUsingLL<>();
		Stack<BinaryTreeNode<Integer>> stack = new Stack();
		int level = 1;
		queue.enqueue(root);
		while (!queue.isEmpty()) {
			BinaryTreeNode<Integer> currentNode;
			try {
				currentNode = queue.dequeue();
				System.out.print(currentNode.data + " ");
				if (level % 2 == 0) {
					if (currentNode.right != null) {
						stack.push(currentNode.right);
					}
					if (currentNode.left != null) {
						stack.push(currentNode.left);
					}
				} else {
					if (currentNode.left != null) {
						stack.push(currentNode.left);
					}
					if (currentNode.right != null) {
						stack.push(currentNode.right);
					}
				}
				if (queue.isEmpty()) {
					while (!stack.isEmpty()) {
						queue.enqueue(stack.pop());
					}
					System.out.println();
					level++;
				}
			} catch (QueueEmptyException e) {
			}
		}
	}

	public static void LevelWise(BinaryTreeNode<Integer> root) {
		if (root == null) {
			return;
		}
		QueueUsingLL<BinaryTreeNode<Integer>> queue = new QueueUsingLL<>();
		queue.enqueue(root);
		queue.enqueue(null);
		while (!queue.isEmpty()) {
			try {
				if (queue.front() == null) {

					if (queue.size() == 1) {
//							do nothing
						queue.dequeue();
					} else {
						queue.dequeue();
						System.out.println();
						queue.enqueue(null);
					}

				} else {
					BinaryTreeNode<Integer> currentNode = queue.dequeue();
					System.out.print(currentNode.data + " ");
					if (currentNode.left != null) {
						queue.enqueue(currentNode.left);
					}
					if (currentNode.right != null) {
						queue.enqueue(currentNode.right);
					}
				}
			} catch (QueueEmptyException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}

	/**
	 * @author mukul
	 * @date: 13-MAY-2019
	 */
	public static ArrayList<LinkedListNode<BinaryTreeNode<Integer>>> LinkedListLevelWise(BinaryTreeNode<Integer> root) {
		if (root == null) {
			return null;
		}
		ArrayList<LinkedListNode<BinaryTreeNode<Integer>>> List = new ArrayList<>();
		QueueUsingLL<BinaryTreeNode<Integer>> queue = new QueueUsingLL<>();
		queue.enqueue(root);
		queue.enqueue(null);
		LinkedListNode<BinaryTreeNode<Integer>> head = null;
		while (!queue.isEmpty()) {
			try {
				if (queue.front() == null) {

					if (queue.size() == 1) {
//							do nothing
						queue.dequeue();
					} else {
						queue.dequeue();
						head = null;
						queue.enqueue(null);
					}

				} else {

					BinaryTreeNode<Integer> currentNode = queue.dequeue();
					LinkedListNode<BinaryTreeNode<Integer>> temp = new LinkedListNode<>(currentNode);
					if (head != null) {
						while (head.next != null) {
							head = head.next;
						}
						head.next = temp;
					}
					if (head == null) {
						head = new LinkedListNode<>(currentNode);
						List.add(head);
					}
					if (currentNode.left != null) {
						queue.enqueue(currentNode.left);

					}
					if (currentNode.right != null) {
						queue.enqueue(currentNode.right);
					}
				}
			} catch (QueueEmptyException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return List;
	}

}
