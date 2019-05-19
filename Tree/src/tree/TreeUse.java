package tree;

import java.util.Scanner;

public class TreeUse {

	public static int numNodes(TreeNode<Integer> root) {
		if (root == null) { // this is not our base case.
			return 0;
		}
		int count = 1;
		for (int i = 0; i < root.children.size(); i++) {
			count += numNodes(root.children.get(i));
		}
		return count;
	}

	public static TreeNode<Integer> takeInput(Scanner s) {
		int n;
		System.out.println("Enter next node data");
		n = s.nextInt();
		TreeNode<Integer> root = new TreeNode<Integer>(n);
		System.out.println("Enter number of children for " + n);
		int childCount = s.nextInt();
		for (int i = 0; i < childCount; i++) {
			TreeNode<Integer> child = takeInput(s);
			root.children.add(child);
		}
		return root;
	}

	public static void printAtk(TreeNode<Integer> root, int k) {
		if (k < 0) {
			return;
		}
		if (k == 0) {
			System.out.print(root.data + " ");
		}
		for (int i = 0; i < root.children.size(); i++) {
			printAtk(root.children.get(i), k - 1);
		}
	}

	public static void postOrder(TreeNode<Integer> root) {
		/*
		 * Your class should be named Solution. Don't write main() function. Don't read
		 * input, it is passed as function argument. Print output as specified in the
		 * question
		 */
		int flag = 0;
		if (root == null) {
			return;
		}
		if (root.children.size() == 0) {
			System.out.print(root.data + " ");
			flag++;
		}
		for (int i = 0; i < root.children.size(); i++) {
			postOrder(root.children.get(i));
		}
		if (flag == 0) {
			System.out.print(root.data + " ");
		}
	}

	public static void print(TreeNode<Integer> root) {
		String s = root.data + ":";
		for (int i = 0; i < root.children.size(); i++) {
			s = s + root.children.get(i).data + ",";
		}
		System.out.println(s);
		for (int i = 0; i < root.children.size(); i++) {
			print(root.children.get(i));
		}
	}

	public static TreeNode<Integer> takeInputLevelWise() {
		Scanner s = new Scanner(System.in);
		System.out.println("Enter node data");
		int rootData = s.nextInt();
		QueueUsingLL<TreeNode<Integer>> pendingNodes = new QueueUsingLL<>();
		TreeNode<Integer> root = new TreeNode<Integer>(rootData);
		pendingNodes.enqueue(root);
		while (!pendingNodes.isEmpty()) {
			try {
				TreeNode<Integer> frontNode = pendingNodes.dequeue();
				System.out.println("Enter num of children of " + frontNode.data);
				int numChildren = s.nextInt();
				for (int i = 0; i < numChildren; i++) {
					System.out.println("Enter " + (i + 1) + "th child of " + frontNode.data);
					int child = s.nextInt();
					TreeNode<Integer> childNode = new TreeNode<Integer>(child);
					frontNode.children.add(childNode);
					pendingNodes.enqueue(childNode);
				}
			} catch (QueueEmptyException e) {
				// Shouldn't come here
				return null;
			}
		}
		return root;
	}

//	public static void printLevelWise(TreeNode<Integer> root) {
//		QueueUsingLL<TreeNode<Integer>> pendingNodes = new QueueUsingLL<>();
//		pendingNodes.enqueue(root);
//		System.out.println(root.data);
//		while (!pendingNodes.isEmpty()) {
//			TreeNode<Integer> firstNode;
//			try {
//				firstNode = pendingNodes.dequeue();
////				String s = firstNode.data + "";
////				System.out.println(s);
//				String child = "";
//				if (firstNode.children.size() == 0) {
//					continue;
//				}
//				for (int i = 0; i < firstNode.children.size(); i++) {
//					child = child + firstNode.children.get(i).data + " ";
//					pendingNodes.enqueue(firstNode.children.get(i));
//				}
//				System.out.println(child);
//			} catch (QueueEmptyException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//
//		}
//	}

	public static void printLevelWise(TreeNode<Integer> root) {
		if (root == null) {
			return;
		}
		QueueUsingLL<TreeNode<Integer>> q = new QueueUsingLL<>();
		TreeNode<Integer> nullNode = new TreeNode<>(Integer.MIN_VALUE);
		q.enqueue(root);
		q.enqueue(nullNode);
		System.out.print(root.data);
		while (q.size() != 1) {
			TreeNode<Integer> temp = null;
			try {
				temp = q.dequeue();

			} catch (QueueEmptyException e) {

			}
			if (temp == nullNode) {
				q.enqueue(nullNode);
				System.out.println();
				continue;
			}
			for (int i = 0; i < temp.children.size(); ++i) {
				System.out.print(temp.children.get(i).data + " ");
				q.enqueue(temp.children.get(i));
			}
		}

	}

	public static TreeNode<Integer> maxSumNode(TreeNode<Integer> root) {
		// Write your code here

		Pair<TreeNode<Integer>, Integer> p = maxSumNodeHelper(root);

		return p.first;
	}

	private static Pair<TreeNode<Integer>, Integer> maxSumNodeHelper(TreeNode<Integer> root) {
		// TODO Auto-generated method stub
		if (root == null) {
			return null;
		}

		if (root.children.size() == 0) {
			Pair<TreeNode<Integer>, Integer> p = new Pair<>();
			p.first = root;
			p.second = root.data;
			return p;
		}

		int sum = root.data;
		for (int i = 0; i < root.children.size(); i++) {
			sum = sum + root.children.get(i).data;
		}
		int max = sum;
		Pair<TreeNode<Integer>, Integer> p = new Pair<>();
		p.first = root;
		p.second = max;
		for (int i = 0; i < root.children.size(); i++) {
			Pair<TreeNode<Integer>, Integer> output = maxSumNodeHelper(root.children.get(i));
			if (max < output.second) {
				max = output.second;
				p.first = output.first;
				p.second = max;
			}
		}
		return p;

	}

	public static TreeNode<Integer> findNextLargerNode(TreeNode<Integer> root, int n) {

		// Write your code here
		if (root == null) {
			return null;
		}
		TreeNode<Integer> ans;
		if (root.data > n) {
			ans = new TreeNode<Integer>(root.data);
		} else {
			ans = null;
		}
		for (int i = 0; i < root.children.size(); i++) {
			TreeNode<Integer> temp = findNextLargerNode(root.children.get(i), n);
			if (temp != null) {
				if (ans == null) {
					ans = temp;
				} else {
					if (temp.data < ans.data) {
						ans = temp;
					}
				}
			}

		}
		return ans;
	}

	public static void main(String[] args) {
//		Scanner s= new Scanner(System.in);
//		
//		TreeNode<Integer> root = takeInput(s);
		TreeNode<Integer> root = takeInputLevelWise();
		printLevelWise(root);
	}
}
