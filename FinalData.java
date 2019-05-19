public class FinalData {
    public String name;
    private int rollNo;
    public FinalData(String name,int rollNo) {
        this.rollNo = rollNo;
        this.name = name;
    }
    public static void main(String[] args) {
        System.out.print("hell owrld");
    }
       
    public void print() {
        System.out.println("Name: " + this.name + "\n RollNo: " + this.rollNo);
    }

    

}
