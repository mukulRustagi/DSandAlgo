package da;

public class DynamicArrayUSe {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		DynamicArray d = new DynamicArray();
		
		
		for (int i = 0; i < 100; i++) {
			d.add(i + 10);
		}
		
		System.out.println(d.size());
		System.out.println(d.get(4));
		d.set(4, 10);
		System.out.println(d.get(4));
//		System.out.println(d.get(3));
//		System.out.println(d.get(4));
//		
//		while (!d.isEmpty()) {
//			System.out.println(d.removeLast());
//			System.out.println("size = " + d.size());
		}
	}


