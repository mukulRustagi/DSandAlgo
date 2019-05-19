package recursion;

public class SumOfArrayElements {
	
	public static int sum(int input[]) {
		
      if(input.length==1){
        return input[0];
      }
      int smallArray[]= new int[input.length-1];
      for (int i=0;i<input.length-1;i++){
        smallArray[i]=input[i];
      }
      return input[input.length-1] + sum(smallArray);
		
	}
	
	public static void main(String args[]) {
		int in[]= {1,2,4,5,6};
		int sum =sum(in);
		System.out.print(sum);
	}

}
