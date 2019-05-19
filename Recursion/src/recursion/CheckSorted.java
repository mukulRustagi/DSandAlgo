package recursion;

public class CheckSorted {


	public static boolean checkSorted(int input[]) {
		if(input.length<=1) {
			return true;
		}
		int smallInput[] =new int[input.length-1];
		for(int i=1; i<input.length;i++) {
			smallInput[i-1]=input[i];
		}
		
		boolean smallAns=checkSorted(smallInput);
		if(!smallAns) {
			return false;
		}
		if(input[0]<=input[1]) {
			return true;
		}
		else {
			return false;
		}
		
	}
	
	
	public static boolean check_sorted_2(int input[]) {
		if(input.length<=1) {
			return true;
		}
		if(input[0]<input[1]) {
			return true;
		}
		int smallIn[]= new int[input.length-1];
		for(int i=1;i<input.length;i++) {
			smallIn[i-1]=input[i];
		}
		boolean checked =check_sorted_2(smallIn);
		return checked;
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	

}
