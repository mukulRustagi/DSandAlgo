package graph;

import java.util.ArrayList;
import java.util.Scanner;

public class Graph {

	public Graph() {

	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		System.out.println("Enter the Number of vertices:");
		int n = s.nextInt();
		System.out.println("Enter the number of edges:");
		int e = s.nextInt();
		int edges[][] = new int[n][n];
		for (int i = 0; i < e; i++) {

			int fv = s.nextInt();

			int sv = s.nextInt();
			edges[fv][sv] = 1;
			edges[sv][fv] = 1;
		}
		boolean ans = isConnected(edges);
		System.out.println(ans);
		printDFS(edges);
		printBFS(edges);
//		System.out.println("####");
//		int v1 = s.nextInt();
//		System.out.println(v1 + "##");
//		int v2 = s.nextInt();
////		System.out.print(hasPath(edges, v1, v2));
//		ArrayList<Integer> ans = getPath(edges, v1, v2);
//		for (int i = 0; i < ans.size(); i++) {
//			System.out.print(ans.get(i) + " ");
//		}
//		System.out.println("DFS");
//		printDFS(edges);
//		System.out.println("BFS");
//		printBFS(edges);
	}

	// Depth First Search start
	public static void printDFS(int edges[][]) {
		boolean visited[] = new boolean[edges.length];

		for (int i = 0; i < visited.length; i++) {
			if (!visited[i]) {
				printDFSHelper(edges, visited, i);
			}
		}
		System.out.print("visited length:" + visited.length);
	}

	private static void printDFSHelper(int[][] edges, boolean[] visited, int sv) {
		// TODO Auto-generated method stub
		System.out.println(sv);
		visited[sv] = true;
		for (int i = 0; i < edges.length; i++) {
			if (edges[sv][i] == 1 && !visited[i]) {
				printDFSHelper(edges, visited, i);
			}
		}
	}
	// Depth First Search end

	// Breadth first search

	public static void printBFS(int edges[][]) {
		boolean visited[] = new boolean[edges.length];

		for (int i = 0; i < edges.length; i++) {
			if (!visited[i]) {
				printBFSHelper(edges, visited, i);
			}
		}
	}

	public static void printBFSHelper(int edges[][], boolean visited[], int sv) {
		QueueUsingLL<Integer> q = new QueueUsingLL<>();
		q.enqueue(sv);
		visited[sv] = true;
		while (!q.isEmpty()) {
			try {
				int first = q.dequeue();
				System.out.println(first);
				for (int i = 0; i < edges.length; i++) {
					if (edges[first][i] == 1 && !visited[i]) {
						q.enqueue(i);
						visited[i] = true;
					}
				}
			} catch (QueueEmptyException e) {
				// TODO Auto-generated catch block
				return;
			}

		}
	}

	private static boolean hasPathHelper(int edges[][], int v1, int v2, boolean visited[]) {

		if (v1 == v2) {
			return true;
		}
		visited[v1] = true;
		if (edges[v1][v2] == 1) {
			return true;
		}
		for (int i = 0; i < edges.length; i++) {
			if (edges[v1][i] == 1 && !visited[i]) {
				boolean ans = hasPathHelper(edges, i, v2, visited);
				if (ans == true) {
					return true;
				}
			}
		}
		return false;
	}

	public static boolean hasPath(int edges[][], int v1, int v2) {
		boolean visited[] = new boolean[edges.length];
		return hasPathHelper(edges, v1, v2, visited);
	}

//	get path

	public static ArrayList<Integer> getPath(int edges[][], int v1, int v2) {
		boolean visited[] = new boolean[edges.length];
		return getPathHelper(edges, v1, v2, visited);
	}

	private static ArrayList<Integer> getPathHelper(int edges[][], int v1, int v2, boolean visited[]) {
		ArrayList<Integer> output = null;
		visited[v1] = true;
		if (v1 == v2) {
			output = new ArrayList<>();
			output.add(v1);
			return output;
		}
		if (edges[v1][v2] == 1) {
			output = new ArrayList<>();
			output.add(v2);
			output.add(v1);
			return output;
		}
		for (int i = 0; i < edges.length; i++) {
			if (edges[v1][i] == 1 & !visited[i]) {
				output = getPathHelper(edges, i, v2, visited);
				if (output != null) {
					output.add(v1);
					return output;
				}
			}
		}
		return output;
	}

	public static boolean isConnected(int edges[][]) {
		boolean visited[] = new boolean[edges.length];
		isConnectedHelper(edges, visited, 0);
		for (int i = 0; i < visited.length; i++) {
			if (!visited[i]) {
				return false;
			}
		}
		return true;
	}

	private static void isConnectedHelper(int edges[][], boolean visited[], int fv) {
		visited[fv] = true;
		for (int i = 0; i < edges.length; i++) {
			if (!visited[i] && edges[fv][i] == 1) {
				isConnectedHelper(edges, visited, i);
			}
		}
	}

}

//spanning tree: a tree which is connected means all nodes are connected and undirected and posses tree properties, called as spanning tree.
// and out of all spanning tree/ graph, one with least weight in total is known as Minimum Spanning tree. there are three porp of mst: connected, weighted, undirected.

// directed graph :one way road
