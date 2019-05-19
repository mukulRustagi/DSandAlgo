package hash;

import java.util.ArrayList;

public class Map<k, v> {
	ArrayList<MapNode<k, v>> buckets;
	int numBuckets;
	int size;

	public Map() {
		numBuckets = 5;
		buckets = new ArrayList<>();
		for (int i = 0; i < numBuckets; i++) {
			buckets.add(null);
		}
	}

	// here, first we are using hashCode function in order to get hashCode
	// then we are doing compression, so that we can store the value in the bucket
	// array.
	private int getBucketIndex(k key) {
		int hashCode = key.hashCode();
		return hashCode % numBuckets;
	}

	public void insert(k key, v value) {
		int bucketIndex = getBucketIndex(key);
		MapNode<k, v> head = buckets.get(bucketIndex);
		while (head != null) {
			if (head.key.equals(key)) {
				head.value = value;
				return;
			}
			head = head.next;
		}
		head = buckets.get(bucketIndex);
		MapNode<k, v> newElementNode = new MapNode<k, v>(key, value);
		size++;
		newElementNode.next = head;
		buckets.set(bucketIndex, newElementNode);
		double loadFactor = (1.0 * size) / numBuckets;
		if (loadFactor > 0.7) {
			rehash();
		}
	}

	public double loadFactor() {
		return (1.0 * size) / numBuckets;
	}

	private void rehash() {
		System.out.println("Rehashing: buckets" + numBuckets + " size " + size);
		ArrayList<MapNode<k, v>> temp = buckets;
		buckets = new ArrayList<>();
		for (int i = 0; i < 2 * numBuckets; i++) {
			buckets.add(null);
		}
		size = 0;
		numBuckets *= 2;
		for (int i = 0; i < temp.size(); i++) {
			MapNode<k, v> head = temp.get(i);
			while (head != null) {
				k key = head.key;
				v value = head.value;
				insert(key, value);
				head = head.next;
			}
		}
	}

	public v removeKey(k key) {
		int bucketIndex = getBucketIndex(key);
		MapNode<k, v> head = buckets.get(bucketIndex);
		MapNode<k, v> prev = null;
		while (head != null) {
			if (head.key.equals(key)) {
				size--;
				if (prev == null) {
					buckets.set(bucketIndex, head.next);
				} else {
					prev.next = head.next;
				}
				return head.value;
			}
			prev = head;
			head = head.next;
		}
		return null;
	}

	public v getValue(k key) {
		int bucketIndex = getBucketIndex(key);
		MapNode<k, v> head = buckets.get(bucketIndex);
		while (head != null) {
			if (head.key.equals(key)) {
				return head.value;
			}
			head = head.next;
		}
		return null;
	}

	public int size() {
		return size;
	}

}
