package graph;

import java.util.Arrays;
import java.util.Scanner;

class Edge implements Comparable<Edge> {
	int source;
	int destination;
	int weight;

	@Override
	public int compareTo(Edge o) {
		// TODO Auto-generated method stub
		return this.weight - o.weight;
	}
}

public class KruskalAlgo {

	// TODO Auto-generated method stub
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		// n is the no. of vetices
		int n = s.nextInt();
		int e = s.nextInt();

		Edge input[] = new Edge[e];
		for (int i = 0; i < e; i++) {
			input[i] = new Edge();
			input[i].source = s.nextInt();
			input[i].destination = s.nextInt();
			input[i].weight = s.nextInt();
		}

		krusals(input, n);
	}

	private static int findParent(int v, int parent[]) {
		// TODO Auto-generated method stub
		if (parent[v] == v) {
			return v;
		} else {
			return findParent(parent[v], parent);
		}
	}

	public static void krusals(Edge input[], int n) {
		Edge output[] = new Edge[n - 1];

		// loop used for taking number of edges

		Arrays.sort(input);
		// parent array
		int parent[] = new int[n];
		for (int i = 0; i < n; i++)
			parent[i] = i;

		int i = 0;
		int count = 0;
		while (count != n - 1) {
			Edge currentEdge = input[i];
			int SourceParent = findParent(currentEdge.source, parent);
			int DestinationParent = findParent(currentEdge.destination, parent);
			if (SourceParent != DestinationParent) {
				output[count] = currentEdge;
				count++;
				parent[SourceParent] = DestinationParent;
			}
			i++;
		}

		for (int j = 0; j < n - 1; j++) {
			if (output[j].source < output[j].destination) {
				System.out.println(output[j].source + " " + output[j].destination + " " + output[j].weight);
			} else {
				System.out.println(output[j].destination + " " + output[j].source + " " + output[j].weight);
			}
		}
	}
	// size of output array is n-1 because MST contains n-1 no. of edges

}
