package graph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class GraphConnectedComponents {

	public GraphConnectedComponents() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) throws VertexOutOfRangeException {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		int noOfVertices = s.nextInt();
		int noOfEdges = s.nextInt();
		Map<Integer, ArrayList<Integer>> adjacenyList = new HashMap<>();
		for (int i = 0; i < noOfVertices; i++) {
			adjacenyList.put(i, new ArrayList<>());
		}

		int currentEntry = 1;

		while (currentEntry <= noOfEdges) {
			int source = s.nextInt();
			int destination = s.nextInt();
			ArrayList<Integer> edgeListForDestination = adjacenyList.get(source);
			ArrayList<Integer> edgeListForSource = adjacenyList.get(destination);

			if (edgeListForDestination != null && edgeListForSource != null) {
				edgeListForDestination.add(destination);
				edgeListForSource.add(source);
			} else {
				s.close();
				throw new VertexOutOfRangeException();
			}
			currentEntry += 1;
		}
		ArrayList<ArrayList<Integer>> allConnectedComponents = allConnectedComponents(adjacenyList);

	}

	private static ArrayList<ArrayList<Integer>> allConnectedComponents(Map<Integer, ArrayList<Integer>> adjacenyList) {
		// TODO Auto-generated method stub
		return null;
	}

}
