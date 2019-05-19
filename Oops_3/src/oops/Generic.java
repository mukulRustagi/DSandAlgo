package oops;

public class Generic<T, V> {
	private T first;
	private V second;

	public Generic(T first, V second) {
		this.first = first;
		this.second = second;
	}

	public void setFirst(T first) {
		this.first = first;

	}

	public void setSecond(V second) {
		this.second = second;

	}

	public T getFirst() {
		System.out.println(this.first);
		return first;
	}

	public V getSecond() {
		System.out.println(this.second);
		return second;
	}

}
