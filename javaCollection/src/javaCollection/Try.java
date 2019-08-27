package javaCollection;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;

public class Try {

	public static void main(String args[]) {

		ArrayList<String> al = new ArrayList<>();
		al.add("al1");
		al.add("al2");
		al.add("al3");
		HashSet<String> hs = new HashSet<>(al);
		hs.add("1");
		hs.add("22");
		hs.add("e");

		Iterator<String> itr = hs.iterator();

		while (itr.hasNext()) {
			System.out.println(itr.next());
		}
		System.out.println("After removing");
		hs.remove("e");
		itr = hs.iterator();
		while (itr.hasNext()) {
			System.out.println(itr.next());
		}
	}

}
