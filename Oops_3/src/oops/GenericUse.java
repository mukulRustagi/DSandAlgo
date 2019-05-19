package oops;

public class GenericUse {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Generic<String, Integer> g1 = new Generic<>("hello", 1);

		Generic<Integer, Integer> g2 = new Generic<>(3, 4);
		g2.getSecond();

		Generic<Generic<Integer, Integer>, Integer> g3 = new Generic<>(g2, 5);

		// g3.getFirst().getFirst();
		g3.getFirst().getSecond();
		//
		// g1.getFirst();
		// g1.setFirst("bye");
		//
		// g1.getSecond();
		// g1.setSecond(2);
		//
		// g1.getFirst();
		// g1.getSecond();

	}

}
